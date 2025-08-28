<h1 align="center">CLEAN architecture template + Auth</h1>

<h2>Tech Stack &amp; Tools</h2>

<h3>Core Technologies</h3>
<ul>
  <li><b>Next.js 15</b> - React framework with App Router</li>
</ul>

<h3>Database &amp; ORM</h3>
<ul>
  <li><b>Drizzle ORM</b> - database toolkit</li>
  <li><b>Drizzle Kit</b> - Database migrations and studio</li>
  <li><b>PostgreSQL</b> - database</li>
</ul>

<h3>UI &amp; Styling</h3>
<ul>
  <li><b>Tailwind CSS</b> - CSS framework</li>
  <li><b>ShadCN</b> - components</li>
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

<h2>Getting Started</h2>

<h3>Required Environment Variables</h3>
<pre>
  
DATABASE_URL="postgresql://postgres:password@localhost:5432/postgres"
  
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

HOST_NAME="http://localhost:3000"

NODE_ENV="development"
</pre>

<h3>Dependency Installation</h3>
<pre>
pnpm install
</pre>

<h3>Docker Database Container</h3>
<p>Start the PostgreSQL database container:</p>
<pre>
docker-compose up -d postgres
</pre>

<p>The database configuration includes:</p>
<ul>
  <li>Container name: <code>e-commerce-template</code></li>
  <li>Port: <code>5432</code> (mapped to host)</li>
  <li>Username: <code>postgres</code></li>
  <li>Password: <code>password</code></li>
  <li>Database: <code>postgres</code></li>
</ul>

<h3>Database Schema Deployment</h3>
<p>Push schema to database (development):</p>
<pre>
pnpm run db:push
</pre>

<h3>Start the Development Server</h3>
<pre>
pnpm dev
</pre>
