import { Router } from 'express'
import { supabase }  from '../config/supabaseClient'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return res.status(401).json({ error: error.message })
  }

  // ✅ set HttpOnly cookies for session mgmt
  res.cookie('sb-access-token', data.session?.access_token ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  res.cookie('sb-refresh-token', data.session?.refresh_token ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  return res.json({ user: data.user })
})

router.post('/signup', async (req, res) => {
  const { email, password, full_name}= req.body

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
        data: {
          name: full_name, // 👈 This saves the name to user_metadata
        },
      },
  })

  if (error) {
    return res.status(401).json({ error: error.message })
  }

   if (data.user) {
      console.log('SignUp successful:', data.user.email)
    } 
  // ✅ set HttpOnly cookies for session mgmt
  res.cookie('sb-access-token', data.session?.access_token ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  res.cookie('sb-refresh-token', data.session?.refresh_token ?? '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
  })

  return res.json({ user: data.user })
})




router.get('/session', async (req, res) => {
  const accessToken = req.cookies?.['sb-access-token']

  if (!accessToken) {
    return res.status(200).json({ user: null })
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)

  if (error) {
    return res.status(401).json({ user: null, error: error.message })
  }

  return res.json({ user })
})

// Logout
router.post('/logout', (req, res) => {
  res.clearCookie('sb-access-token')
  res.clearCookie('sb-refresh-token')
  return res.json({ success: true })
})

export default router