# LoreAI

A lightweight, Confluence-like knowledge management web application enhanced with an AI assistant powered by RAG (Retrieval-Augmented Generation).

## Features

- 📚 **Knowledge Management**: Create and organize documents in spaces
- 🤖 **AI Assistant**: Get instant answers from your knowledge base using RAG
- 🚀 **Quick Onboarding**: Help new team members with AI-powered guidance
- 🔍 **Smart Search**: Find information across all your documents
- 👥 **Team Collaboration**: Share knowledge within your organization

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript
- **Styling**: TailwindCSS
- **Backend**: Supabase (PostgreSQL + Vector DB)
- **AI**: OpenAI/Anthropic APIs with RAG
- **Hosting**: Vercel

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   Fill in your Supabase and OpenAI API keys.

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication pages
│   ├── (dashboard)/       # Main dashboard
│   ├── spaces/            # Space management
│   ├── documents/         # Document pages
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Basic UI components
│   └── layout/           # Layout components
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Development Roadmap

- [x] Basic Next.js + TailwindCSS setup
- [x] Authentication pages (login/signup)
- [x] Dashboard with spaces and documents
- [ ] Supabase integration
- [ ] Document editor (WYSIWYG/Markdown)
- [ ] AI assistant chat interface
- [ ] RAG implementation with vector embeddings
- [ ] Search functionality
- [ ] User management and permissions

## Contributing

This is a portfolio project showcasing modern web development with AI integration. Feel free to explore the code and suggest improvements!

## License

MIT License - see LICENSE file for details.
