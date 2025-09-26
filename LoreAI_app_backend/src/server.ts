import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import 'dotenv/config';

import documentsRouter from './routes/documents';
import authRoutes from './routes/auth';
import aiRouter from './routes/ai';
import workspacesRouter from './routes/workspaces';

const app = express();
let PORT = parseInt(process.env.PORT || '5000', 10);

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(cookieParser())                // << add this before routes
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/api/workspaces', workspacesRouter);
app.use('/api/documents', documentsRouter);
app.use('/auth', authRoutes);
app.use('/api/ai', aiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server with port fallback
function startServer(port: number) {
  const server = app.listen(port, () => {
    console.log(`🚀 LoreAI backend running on http://localhost:${port}`);
    console.log(`📊 Health check: http://localhost:${port}/health`);
  });

  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${port} already in use, trying ${port + 1}...`);
      startServer(port + 1); // Retry with next port
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(PORT);

export default app;