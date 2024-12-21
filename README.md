# Skeleton Site Template

A modern, responsive website template with SASS styling and Netlify Forms integration.

## Features

- Responsive design with mobile-first approach
- SASS/SCSS for structured styling
- Contact form with Netlify Forms integration
- Mobile navigation menu
- Multiple page templates (Home, Products, Services, etc.)

## Project Structure

```
skeleton_site/
├── src/
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   │       ├── heroes/
│   │       ├── logos/
│   │       └── products/
│   ├── css/
│   │   └── styles.css        # Compiled CSS
│   ├── js/
│   │   └── app.js           # Main JavaScript file
│   ├── pages/               # HTML pages
│   │   ├── about.html
│   │   ├── blog.html
│   │   ├── contact.html
│   │   ├── gallery.html
│   │   ├── products.html
│   │   └── services.html
│   ├── sass/
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── utilities/
│   │   └── app.scss         # Main SASS file
│   └── index.html           # Homepage
├── netlify.toml             # Netlify configuration
├── package.json
└── README.md
```

## Setup

1. Clone the repository:

```bash
git clone https://github.com/hasanCHOP/skeleton-site.git
cd skeleton-site
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

This will:

- Watch for SASS changes and compile to CSS
- Start a local server with live reload
- Open the site in your default browser

## Development

### Scripts

- `npm run dev` - Start development environment
- `npm run build` - Build production CSS
- `npm run sass` - Watch SASS files
- `npm run serve` - Start local server

### Styling

- SASS files are organized by functionality
- Edit files in `src/sass/` directory
- Styles automatically compile to `src/css/styles.css`

### Contact Form

The contact form is integrated with Netlify Forms:

- Form submissions are handled automatically
- View submissions in Netlify dashboard
- No backend code required
- Spam protection included

## Deployment

### Netlify Deployment

1. Push code to GitHub
2. Connect repository to Netlify
3. Configure build settings:
   - Base directory: .
   - Build command: npm run build
   - Publish directory: src

### Form Submissions

Access form submissions:

1. Go to Netlify dashboard
2. Select your site
3. Click "Forms" in sidebar
4. View all submissions

Set up email notifications:

1. Go to Site configuration
2. Scroll to Forms
3. Configure Form notifications

## License

ISC License

## Author

Hasan Jackson
