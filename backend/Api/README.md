# Portfolio Backend API

ASP.NET Core minimal API for portfolio data and contact form.

## Endpoints

### GET /health
Returns API health status, environment, and version.

**Response:**
```json
{
  "status": "healthy",
  "environment": "Development",
  "version": "1.0.0",
  "timestamp": "2025-12-29T10:00:00Z"
}
```

### GET /api/personal
Returns personal information including name, title, contact details, and about section.

**Response:**
```json
{
  "name": "Kelvin Long",
  "title": "Backend Software Engineer",
  "subtitle": "C# .NET Developer | Desktop & Web Applications",
  "contact": {
    "email": "klong101099@gmail.com",
    "phone": "0372420570",
    "location": "Ho Chi Minh City, Vietnam",
    "github": "https://github.com/LongKelvin",
    "linkedin": "https://longkelvin.github.io/"
  },
  "about": { ... }
}
```

### GET /api/skills
Returns categorized technical skills with proficiency levels.

### GET /api/experience
Returns work experience history with achievements and tech stacks.

### GET /api/projects
Returns portfolio projects with descriptions, tech stacks, and links.

### GET /api/education
Returns educational background and certifications.

### POST /contact
Sends contact form submission via email.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'd like to discuss a project..."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully!"
}
```

## Data Management

Portfolio data is stored in JSON files located in `backend/Api/Data/`:
- `personal.json` - Personal information and contact details
- `skills.json` - Technical skills organized by category
- `experience.json` - Work experience history
- `projects.json` - Portfolio projects
- `education.json` - Educational background

These files are loaded at application startup and served through API endpoints.

## Local Development

### Prerequisites
- .NET 10 SDK
- (Optional) SMTP credentials for email functionality

### Setup

1. Install dependencies:
```bash
cd backend/Api
dotnet restore
```

2. Configure email (optional):
   - Copy `.env.example` to `.env` or use User Secrets
   - Update SMTP settings

3. Run the API:
```bash
dotnet run
```

API will be available at `http://localhost:5000`

### Using User Secrets (Recommended for local dev)
```bash
dotnet user-secrets init
dotnet user-secrets set "Email:SmtpHost" "smtp.gmail.com"
dotnet user-secrets set "Email:SmtpUsername" "your-email@gmail.com"
dotnet user-secrets set "Email:SmtpPassword" "your-app-password"
```

## Azure Deployment

### Configuration

Set these environment variables in Azure App Service:

**Required:**
- `Cors__AllowedOrigins` - Your frontend URL(s)
- `Email__ToEmail` - Where contact form emails should be sent

**Optional (for email functionality):**
- `Email__SmtpHost`
- `Email__SmtpPort`
- `Email__SmtpUsername`
- `Email__SmtpPassword`
- `Email__FromEmail`
- `Email__EnableSsl`

**Optional (for monitoring):**
- `ApplicationInsights__ConnectionString`

### Deployment Options

1. **GitHub Actions** (see `.github/workflows/backend-deploy.yml`)
2. **Azure CLI:**
   ```bash
   az webapp up --name your-api-name --resource-group your-rg --runtime "DOTNETCORE:10.0"
   ```
3. **VS Code Azure Extension**

## Email Configuration

If SMTP is not configured, contact form submissions will be logged only (no email sent). This allows the API to work in development without email setup.

For production, configure SMTP using:
- Gmail (requires App Password)
- SendGrid
- Azure Communication Services
- Any SMTP service

### Gmail Setup
1. Enable 2FA on your Google account
2. Generate an App Password
3. Use the App Password (not your regular password)

## Testing

Test the health endpoint:
```bash
curl http://localhost:5000/health
```

Test the contact endpoint:
```bash
curl -X POST http://localhost:5000/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"This is a test message"}'
```

## CORS

The API is configured to accept requests from:
- `http://localhost:5173` (Vite dev server)
- Any origins specified in `Cors:AllowedOrigins` configuration

Update the `Cors__AllowedOrigins` environment variable in Azure to include your production frontend URL.
