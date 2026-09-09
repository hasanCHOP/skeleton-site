# Repository overview

This is a small, framework-free, multi-page website template. It consists of:

- Static HTML pages under `src/`
- Shared responsive styling authored in Sass and compiled to CSS
- Vanilla JavaScript for mobile navigation and form state
- Stripe-powered product and service listings
- Netlify Functions for server-side Stripe API access
- A contact form intended for Netlify Forms
- BrowserSync and Sass tooling for local development

Netlify publishes the `src/` directory as the website and deploys functions from `netlify/functions/`.

## How the pages relate

All seven pages use essentially the same site shell:

1. A shared-style header containing:
   - Hamburger menu
   - Placeholder external logo
   - Desktop navigation
   - Search, account, and shopping-bag icons
2. A slide-out mobile navigation menu
3. Page-specific `<main>` content
4. A common footer
5. `src/js/app.js` for shared navigation behavior

The navigation connects every page:

```text
Home (/)
├── Products (/pages/products.html)
├── Services (/pages/services.html)
├── Gallery (/pages/gallery.html)
├── Blog (/pages/blog.html)
├── About (/pages/about.html)
└── Contact (/pages/contact.html)
```

Because `index.html` is in `src/` while the other pages are in `src/pages/`, their relative stylesheet and script paths differ:

- Home uses paths such as `css/styles.css` and `js/app.js`.
- Interior pages use `../css/styles.css` and `../js/app.js`.
- Links between interior pages use sibling filenames such as `about.html`.
- Home links use the root path `/`.

Products and Services additionally share `stripe-loader.js`. Their `stripe-category` metadata determines which Stripe records they display and which checkout mode is used:

```text
Products page
  stripe-category="physical"
  → fetch matching Stripe prices
  → one-time payment checkout

Services page
  stripe-category="service"
  → fetch matching Stripe prices
  → subscription checkout
```

The Contact page is the only page with a functional form. It posts directly through Netlify Forms rather than through a custom function.

# File-by-file description

## Root files

### `README.md`

Introduces the repository as a responsive skeleton site template. It documents:

- Main features
- Expected directory structure
- Installation with `npm install`
- Development using `npm run dev`
- Sass compilation
- Netlify Forms behavior
- Netlify deployment settings
- ISC licensing and authorship

Its illustrated structure includes asset directories for fonts and images, although those directories are not present among the tracked files inspected.

### `package.json`

Defines the Node package as `e-commerce-site-template` version `1.0.0.

Development commands:

- `npm run build`: compiles `src/sass/app.scss` into compressed `src/css/styles.css`
- `npm run sass`: watches Sass files and recompiles when they change
- `npm run serve`: serves `src/` using BrowserSync and reloads when HTML, CSS, or JavaScript changes
- `npm start` and `npm run dev`: run the Sass watcher and BrowserSync concurrently

Runtime dependencies:

- `stripe`: Stripe server SDK used by the Netlify Functions
- `dotenv`: loads environment variables locally
- `express`: included as a dependency, although the inspected application code does not directly use it

Development dependencies:

- `sass`
- `browser-sync`
- `npm-run-all`

### `package-lock.json`

The npm lockfile for the dependency tree in `package.json`. It records exact resolved package versions, integrity hashes, transitive dependencies, platform-specific optional packages, and Node compatibility information. It uses npm lockfile format version 3.

### `netlify.toml`

Configures Netlify:

- Publishes the `src/` directory
- Builds with `npm run build`
- Finds serverless functions in `netlify/functions`
- Bundles functions using esbuild
- Uses Node.js 18 for builds
- Applies the same publish and function locations during Netlify development

## HTML pages

### `src/index.html`

The home page and root entry point.

It contains:

- Shared header and navigation
- Links from the root into every file under `pages/`
- A minimal `<main>` containing “Home Page”
- Shared footer
- The main JavaScript bundle

It also loads Font Awesome from cdnjs for the header icons and displays a placeholder Logoipsum image.

### `src/pages/about.html`

A placeholder About page. It uses the shared header, navigation, mobile menu, footer, stylesheet, Font Awesome dependency, and `app.js`. Its unique content is currently only an “About Page” heading.

### `src/pages/blog.html`

A placeholder Blog page with the same shared site structure. Its unique content is only a “Blog Page” heading.

### `src/pages/contact.html`

The contact page. Instead of a placeholder heading, its main content contains a Netlify-compatible contact form with:

- Form name and hidden `form-name` field
- Required name field
- Required email field
- Required message textarea
- Submit button
- A hidden feedback element

The form uses `method="POST"` and `data-netlify="true"`, allowing Netlify to discover and process it during deployment.

`app.js` disables the submit button and changes its text to “Sending...” when submission begins. The browser then continues with the normal form submission.

### `src/pages/gallery.html`

A placeholder Gallery page whose unique content is a “Gallery Page” heading. Everything else follows the common page shell.

### `src/pages/products.html`

The Stripe-backed products page.

Distinctive elements:

- Page title: “Our Products”
- `stripe-category` metadata set to `physical`
- An initially empty `#stripe-items` grid
- Stripe’s hosted JavaScript library
- The local `stripe-loader.js` script

On load, the local script requests Stripe prices tagged as physical products and renders them into the grid. Clicking Purchase requests a one-time Stripe Checkout session.

### `src/pages/services.html`

The Stripe-backed services page.

It has the same structure and loading logic as Products, but its `stripe-category` is `service`. That category is used both:

- To filter the returned Stripe records
- To request subscription-mode Stripe Checkout

## Browser JavaScript

### `src/js/app.js`

Provides functionality shared by every page:

- Looks up the hamburger button and mobile navigation
- Opens and closes the mobile navigation by toggling CSS classes
- Closes the menu when the user clicks outside it
- Detects the contact form when present
- Disables its submit button during submission
- Changes the button text to “Sending...”

The form handling is guarded by `if (contactForm)`, so it only runs on the Contact page. The navigation handling is used across all pages.

### `src/js/stripe-loader.js`

Used only by Products and Services.

Its flow is:

1. Read the category from the page’s `stripe-category` meta element.
2. Request `/.netlify/functions/stripe-items?category=...`.
3. Render each returned Stripe price and expanded product as a card containing:
   - Product image
   - Name
   - Description
   - Formatted price
   - Purchase button
4. Show an error message in the grid if loading fails.
5. When Purchase is clicked, POST the Stripe price ID and checkout mode to `/.netlify/functions/create-checkout`.
6. Redirect the browser to the Stripe-hosted Checkout URL returned by the function.

The category selects the checkout mode:

- `service` → `subscription`
- Any other category → `payment`

## Netlify Functions

### `netlify/functions/stripe-items.js`

A GET-only serverless endpoint that retrieves the store catalog from Stripe.

It:

- Creates a Stripe client using `STRIPE_SECRET_KEY`
- Reads `category` from the query string
- Lists active Stripe prices
- Expands each price’s associated product
- Filters prices by `price.product.metadata.category`
- Returns the matching objects as JSON

Unsupported HTTP methods receive status 405. Stripe or processing errors receive status 500.

### `netlify/functions/create-checkout.js`

A POST-only serverless endpoint that starts checkout.

It:

- Loads environment variables using `dotenv`
- Creates a Stripe client using `STRIPE_SECRET_KEY`
- Parses `priceId` and `mode` from the request body
- Creates a Checkout Session for one unit of the selected Stripe price
- Builds redirect URLs from Netlify’s `URL` environment variable and request information
- Returns the Stripe-hosted Checkout URL as JSON

Unsupported methods receive status 405, while checkout creation failures receive status 500.

## Sass source

### `src/sass/app.scss`

The Sass entry point. It imports the five Sass areas:

- `utilities`
- `abstracts`
- `base`
- `components`
- `layouts`

This is the source file compiled by the package scripts.

### `src/sass/abstracts/_index.scss`

An empty index reserved for Sass abstractions such as variables, functions, and mixins.

### `src/sass/utilities/_index.scss`

An empty index reserved for utility classes or utility-related Sass modules.

### `src/sass/base/_index.scss`

Forwards the normalization module, making `_normalize.scss` part of the main stylesheet.

### `src/sass/base/_normalize.scss`

Contains browser-normalization and foundational layout rules. It standardizes behavior for:

- HTML and body sizing
- Text elements
- Images
- Forms and controls
- Details and summary elements
- Hidden content

It also makes the body a full-height flex column, which supports the sticky-bottom footer behavior implemented by the main content styles.

### `src/sass/components/_index.scss`

Aggregates and forwards the component styles:

- Header
- Footer
- Main content
- Mobile navigation
- Stripe item cards

### `src/sass/components/_header.scss`

Styles the shared desktop header:

- Flex-based alignment
- Logo presentation
- Horizontal navigation
- Account icon row
- Hover colors

At widths of 768px or less, it hides the desktop navigation and centers the logo.

### `src/sass/components/_footer.scss`

Gives the footer:

- Dark background
- White centered text
- Internal padding

### `src/sass/components/_main.scss`

Makes `<main>` consume the remaining vertical space using `flex: 1`, keeping the footer at the bottom on short pages. It also adds page padding.

### `src/sass/components/_mobile-nav.scss`

Defines both the hamburger animation and slide-out navigation:

- Hamburger is hidden on desktop and displayed at 768px or less.
- Its three bars transform into an “X” when `.is-active` is applied.
- The mobile menu begins translated off the left edge.
- Adding `.active` slides it into view.
- Links and hover states are styled for the white menu panel.

These state classes are toggled by `src/js/app.js`.

### `src/sass/components/_stripe-items.scss`

Styles the dynamic Products and Services listings:

- Responsive CSS grid
- Product/service cards
- Images, headings, descriptions, and prices
- Purchase buttons
- Hover elevation and shadow effects
- Smaller spacing and type sizes on mobile

### `src/sass/layouts/_index.scss`

Forwards the contact layout module.

### `src/sass/layouts/_contact.scss`

Provides site typography and contact-form presentation:

- Arial as the body font
- Centered, bounded form container
- Full-width form controls
- Submit button hover and disabled states
- Success and error feedback variants
- Generic `.hidden` behavior

The success and error selectors support the feedback element in `contact.html`, although the current client script leaves Netlify to perform the actual submission.

## Generated CSS

### `src/css/styles.css`

The compiled CSS output generated from `src/sass/app.scss` and its forwarded partials. It contains the browser-ready equivalents of the normalization, header, footer, main, mobile-navigation, Stripe-grid, and contact-form styles.

This file is checked into the repository and linked directly by every HTML page. The production build regenerates it in compressed form.

## Overall request flow

```text
Browser
  ├── Static pages, CSS, and JS served from src/
  ├── Contact form POST handled by Netlify Forms
  └── Products/Services
       ├── GET /.netlify/functions/stripe-items
       │    └── Netlify Function queries Stripe
       └── POST /.netlify/functions/create-checkout
            └── Netlify Function creates Stripe Checkout session
                 └── Browser redirects to Stripe
```

## Testing

No code or tests were run, in accordance with the requested read-only review.

✅ `pwd; printf '%s\n' '--- AGENTS ---'; find .. -name AGENTS.md -print; printf '%s\n' '--- FILES ---'; rg --files -g '!node_modules' -g '!vendor' | sort` — statically enumerated repository files and confirmed no applicable `AGENTS.md` was present.

✅ `sed`, `cat`, `wc`, `head`, and `git status --short` inspection commands — read the source, configuration, generated CSS metadata, and lockfile header without modifying the repository.

No files were changed, so no commit or pull request was created.
