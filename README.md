e-commerce template built with Next.js 15

Tech Stack & Tools

Core Technologies
    Next.js 15 - React framework with App Router

Database & ORM
    Drizzle ORM - database toolkit
    PostgreSQL - database
    Drizzle Kit - Database migrations and studio

UI & Styling
    Tailwind CSS - CSS framework
    Radix UI - component primitives
    Lucide React - icons

Authentication & Validation
    React Hook Form - Form management
    Zod - Runtime type validation
    Arctic - OAuth library for secure authentication
    Google OAuth - Social authentication


Repository Structure

The project follows a clean architecture pattern with clear separation of concerns:

src/  
├── app/                   # Next.js App Router pages  
│   ├── (dashboard)/       # Dashboard routes  
│   ├── (main)/            # Main application routes  
│   │   ├── (auth)/        # Authentication pages  
│   │   ├── (landing)/     # Landing page components  
│   │   └── (product)/     # Product-related pages  
├── components/            # Reusable UI components  
├── db/                    # Database configuration and schema  
│   └── schema/            # Drizzle schema definitions  
├── data-access/           # Data access layer (Repository pattern)  
├── use-cases/             # Business logic layer  
├── hooks/                 # Custom React hooks  
└── lib/                   # Utility functions and configurations  
