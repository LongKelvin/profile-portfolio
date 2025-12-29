# Portfolio Frontend

Modern, responsive portfolio website built with React, Vite, and Tailwind CSS.

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

## Features

- ✨ Modern, clean UI with smooth animations
- 📱 Fully responsive design (mobile-first)
- 🎨 Beautiful gradient backgrounds and hover effects
- 📧 Contact form with validation
- 🚀 Fast load times with Vite
- ♿ Accessible components
- 🎯 Smooth scroll navigation

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Environment Variables

Create a `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Header, Footer, Layout
│   ├── sections/        # Hero, About, Skills, Experience, Projects, Contact
│   └── ui/              # Reusable UI components
├── data/                # JSON data files
├── services/            # API service
├── utils/               # Utilities and validation
├── App.jsx              # Main app component
└── main.jsx             # Entry point
```

## Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Customization

### Update Personal Information

Edit the JSON files in `src/data/`:
- `personal.json` - Name, contact info, bio
- `skills.json` - Skills by category
- `experience.json` - Work history
- `projects.json` - Project showcase
- `education.json` - Education background

### Customize Colors

Edit `tailwind.config.js` to change the primary color scheme:

```js
colors: {
  primary: {
    // Your custom colors
  }
}
```

## Building for Production

```bash
npm run build
```

Output will be in the `dist/` directory, ready for deployment to Azure Static Web Apps or any static hosting service.

## Deployment

This project is configured for Azure Static Web Apps. See the main README for deployment instructions.

## License

MIT
