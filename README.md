# E-Commerce Management System

A full-stack e-commerce management system built with Next.js frontend and Express.js backend, featuring product and category management with PostgreSQL.

## Features

- **Product Management**: Full CRUD operations for products
- **Category Management**: Full CRUD operations for categories  
- **Modern UI**: Responsive design with Tailwind CSS
- **Type Safety**: Built with TypeScript
- **RESTful API**: Express.js backend with Prisma ORM

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- React Hook Form + Zod
- TanStack React Query

### Backend
- Express.js
- TypeScript  
- Prisma ORM
- PostgreSQL - Supabase
- Zod

## Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL

### Installation

1. **Clone and setup backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database URL
npx prisma generate
npx prisma migrate dev --name init
npm run dev
**2. **Clone and setup frontend****
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL (http://localhost:3001)
npm run dev

3. Access the app

Frontend: http://localhost:3000

Backend: http://localhost:30001

## Environment Variables
Backend
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
PORT=30001
Frontend
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

Scripts
Backend
npm run dev          # Development
npm run build        # Build
npm start           # Production
npm run seed        # Seed database

Frontend
npm run dev          # Development
npm run build        # Build
npm start           # Production
npm run lint        # Linting

API Endpoints
GET /api/products - Get all products

POST /api/products - Create product

PUT /api/products/:id - Update product

DELETE /api/products/:id - Delete product

GET /api/categories - Get all categories

POST /api/categories - Create category

PUT /api/categories/:id - Update category

DELETE /api/categories/:id - Delete category

Deployment
Frontend
Vercel (recommended), Netlify, or Node hosting

Backend
Railway, Heroku, DigitalOcean, or Node hosting

Database
Railway, Supabase, AWS RDS, or PostgreSQL hosting
