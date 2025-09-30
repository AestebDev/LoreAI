INSERT INTO documents (id, title, content, markdown, tags, author_id, user_id, workspace_id, created_at, updated_at)
VALUES
-- 1. Team Charter
(gen_random_uuid(), 'Team Charter & Ways of Working',
'Defines team mission, principles, roles and working hours.',
'# Team Charter & Ways of Working

## Mission
Build and maintain **LoreAI**, a lightweight knowledge hub enhanced with an AI assistant.

## Principles
- Transparency
- Agility
- User focus

## Roles
- Product Owner (Alice)
- Scrum Master (Ben)
- Developers

## Working Hours
Core: 10:00–16:00 CET / Async via Slack
',
ARRAY['agile','team','charter'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 2. Sprint Workflow
(gen_random_uuid(), 'Sprint Workflow & Ceremonies',
'Describes agile sprint cadence and ceremonies: planning, standup, review, retro.',
'# Sprint Workflow & Ceremonies

## Sprint Cadence
- 2 weeks (Mon–Fri)
- Sprint board in *Jira*

## Ceremonies
1. Sprint Planning
2. Daily Standup
3. Sprint Review
4. Retrospective
',
ARRAY['agile','sprints','workflow'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 3. DoD & DoR
(gen_random_uuid(), 'Definition of Done & Ready',
'Lists quality criteria a story must meet before considered Ready or Done.',
'# Definition of Done (DoD) & Ready (DoR)

## Ready
- Acceptance criteria
- Dependencies clear
- Estimation agreed
- Test cases discussed

## Done
- Code reviewed & merged
- Unit tests written & passed
- CI/CD green
- Docs updated
',
ARRAY['agile','quality','definition'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 4. Team Agreements
(gen_random_uuid(), 'Team Agreements & Communication',
'Defines team communication rules, decision making and conflict resolution process.',
'# Team Agreements & Communication Guidelines

## Channels
- Slack
- LoreAI (docs)
- Jira (tracking)

## Agreements
- Reply < 24h
- No agenda = no meeting
- Record demos

## Decision-Making
- Team consensus
- PO final call if needed
',
ARRAY['team','rules','communication'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 5. Onboarding Guide
(gen_random_uuid(), 'Onboarding Guide',
'A quick start guide for new joiners: checklist, buddy system, important docs.',
'# Onboarding Guide

## Day 1
- Get Slack, Jira, GitHub access
- Meet your buddy
- Review Charter & Agreements

## Week 1
- Pair program
- Attend ceremonies
- Explore Frontend + Backend docs
',
ARRAY['onboarding','guide'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 6. Frontend Stack
(gen_random_uuid(), 'Frontend Stack Overview',
'Describes LoreAI frontend architecture: Next.js, React, Tailwind, Vercel.',
'# Frontend Stack

- Next.js + React
- TailwindCSS styling
- React Query for data fetching
- Vercel hosting
- AI assistant UI via custom panel/Vercel AI SDK
',
ARRAY['tech','frontend','stack'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now()),

-- 7. Backend Stack
(gen_random_uuid(), 'Backend Stack Overview',
'Describes LoreAI backend architecture: Supabase, Postgres, RAG pipeline.',
'# Backend Stack

## Database
- Supabase (Postgres + vector extension)

## RAG pipeline
- Chunk → Embed → Store → Retrieve → LLM

## APIs
- Supabase functions / REST
- Auth via Supabase Auth

## Hosting
- Supabase Cloud
',
ARRAY['tech','backend','stack'], NULL, NULL, '9e614135-08be-4e65-acd3-72ef3cc5da6c', now(), now());