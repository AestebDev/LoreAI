# LoreAI Backend

Backend API for LoreAI knowledge management system with AI assistant.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Fill in your Supabase and OpenAI credentials in `.env.local`

4. Run the Supabase SQL setup script in your Supabase dashboard

5. Start development server:
```bash
npm run dev
```

## API Endpoints

- `POST /api/documents` - Create new document
- `GET /api/documents` - List all documents
- `POST /api/ai/query` - Query AI assistant

## Database Setup

Run the SQL script in `supabase-setup.sql` in your Supabase SQL editor.
