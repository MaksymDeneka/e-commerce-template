<h1 align="center">E-commerce Template built with Next.js 15</h1>

<h2>Tech Stack &amp; Tools</h2>

<h3>Core Technologies</h3>
<ul>
  <li><b>Next.js 15</b> - React framework with App Router</li>
</ul>

<h3>Database &amp; ORM</h3>
<ul>
  <li><b>Drizzle ORM</b> - database toolkit</li>
  <li><b>PostgreSQL</b> - database</li>
  <li><b>Drizzle Kit</b> - Database migrations and studio</li>
</ul>

<h3>UI &amp; Styling</h3>
<ul>
  <li><b>Tailwind CSS</b> - CSS framework</li>
  <li><b>Radix UI</b> - component primitives</li>
  <li><b>Lucide React</b> - icons</li>
</ul>

<h3>Authentication &amp; Validation</h3>
<ul>
  <li><b>React Hook Form</b> - Form management</li>
  <li><b>Zod</b> - Runtime type validation</li>
  <li><b>Arctic</b> - OAuth library for secure authentication</li>
  <li><b>Google OAuth</b> - Social authentication</li>
</ul>

<h2>Repository Structure</h2>

<pre>
src/
├── app/                  # Next.js App Router pages
│   ├── (dashboard)/      # Dashboard routes
│   ├── (main)/           # Main application routes
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (landing)/    # Landing page components
│   │   └── (product)/    # Product-related pages
├── components/           # Reusable UI components
├── db/                   # Database configuration and schema
│   └── schema/           # Drizzle schema definitions
├── data-access/          # Data access layer (Repository pattern)
├── use-cases/            # Business logic layer
├── hooks/                # Custom React hooks
└── lib/                  # Utility functions and configurations
</pre>
