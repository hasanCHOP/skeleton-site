# Repository rules for future work

These rules describe the site as it exists now. Preserve the established values and structure unless a task explicitly asks for a redesign. Do not silently normalize an inconsistency: keep it, or call it out when changing nearby code.

## Source layout and assets

- Treat `src/sass/app.scss` as the Sass entry point. It loads, in order, `utilities`, `abstracts`, `base`, `components`, and `layouts` with `@use`.
- Component partials live in `src/sass/components/`; the contact-page partial lives in `src/sass/layouts/`; normalization lives in `src/sass/base/`.
- `src/sass/abstracts/` is currently empty of abstractions: its `_index.scss` file is empty. Do not assume variables, functions, mixins, or design tokens exist.
- `src/sass/utilities/` is currently empty of a general utility system. Its sole `_index.scss` content is the existing `.visually-hidden` accessibility helper; record this exception rather than treating it as a broader utility library.
- `src/assets/` holds `icons.svg` (the search, user, and bag symbol sprite) and `logo.svg`. Keep HTML asset paths relative: `assets/...` from `src/index.html` and `../assets/...` from `src/pages/*.html`.
- `src/css/styles.css` is compiled output. Make styling changes in Sass rather than editing only the generated CSS.

## Exact color rules

Retain the literal color notation already used; equivalent spellings are an existing inconsistency, not permission to consolidate them without an explicit task.

- `#fff`: header background, header text, logo-link text, footer text, mobile-navigation background, and item-card background.
- `white`: mobile-navigation container text, Stripe item button text, and contact submit-button text. This duplicates `#fff` in a different notation.
- `#2d2d2d`: desktop navigation links, account icons, hamburger bars, mobile links, item headings, footer background, and contact submit-button background.
- `#00bcd4`: desktop and mobile navigation-link hover color.
- `#ddd`: item-card border.
- `#666`: item description text.
- `#2c5282`: item price text.
- `#4299e1`: item button background; `#2b6cb0` is its hover background.
- `#ccc`: contact-form border and contact field/button borders. Disabled contact buttons instead use `#cccccc`, an inconsistent expanded spelling of the same color.
- `#555`: contact submit-button hover background.
- Contact success feedback uses background `#d4edda`, text `#155724`, and border `#c3e6cb`.
- Contact error feedback uses background `#f8d7da`, text `#721c24`, and border `#f5c6cb`.
- Item hover shadow is `rgba(0, 0, 0, 0.1)`.
- The normalize stylesheet also uses the system color keyword `ButtonText` for Firefox button focus outlines; it is not a project hex color.

## Typography rules

- The only site-level font declaration is `Arial, sans-serif` on `body`, currently supplied by the contact layout partial even though that partial is globally loaded. Preserve that global effect unless deliberately restructuring styles.
- Normalize assigns `monospace, monospace` and `1em` to `code`, `kbd`, `samp`, and `pre`; `small` is `80%`; and `sub`/`sup` are `75%` with line-height `0`.
- Form controls inherit the surrounding font, use `100%`, and have line-height `1.15`.
- The logo link has font-size `1.5rem` and bold weight, although its visible content is currently an image.
- Mobile navigation links use `1.2em` (relative to their parent, unlike the rem-based values elsewhere).
- Item headings are `1.25rem`; item descriptions have line-height `1.4`; prices are `1.5rem` and bold; item buttons are `1rem`.
- At widths of `768px` or less, prices become `1.25rem`.
- No explicit typography is set for body copy, navigation links, footer text, labels, or page `h1` elements beyond inheritance/browser defaults. Do not invent values for them.

## Spacing, sizing, and shape rules

- The document/body use `height: 100%`; body is a column flex container with margin `0` and padding `0`. `main` grows with `flex: 1` and has `20px` padding.
- Header and footer padding is `10px 20px`. Header content is a space-between flex row centered on the cross axis.
- The logo image is exactly `140px` by `40px` in both Sass and HTML attributes.
- Desktop navigation and account-icon lists use `15px` gaps. Navigation lists explicitly reset margin and padding to `0`; account-icon lists do not, which is an existing inconsistency.
- Account SVGs are `1.125rem` square.
- The hamburger uses a `5px` gap. Each bar is `25px` by `2px` with an `8px` radius; active outer bars translate `7px` and `-7px` before rotating. Its z-index is `100`.
- Mobile navigation is `80vw` wide, `100%` high, and padded `80px 20px`; its list resets margin/padding to `0`, and each item has `15px 0` margin.
- The responsive breakpoint is consistently a maximum width of `768px`, but header/mobile-nav rules say `@media only screen and (max-width: 768px)` while item-grid rules say `@media (max-width: 768px)`. Preserve this syntax inconsistency unless intentionally consolidating it.
- The item grid uses `repeat(auto-fit, minmax(250px, 1fr))`, a `2rem` gap and padding, `1200px` maximum width, and `0 auto` margin. At the breakpoint it uses a `200px` minimum, `1rem` gap, and `1rem` padding.
- Item cards use `1.5rem` padding, a `1px` border, and `8px` radius; responsive padding is `1rem`. Hover moves them `-5px` and adds `0 5px 15px rgba(0, 0, 0, 0.1)`.
- Item images use `100%` maximum width, auto height, `4px` radius, and `1rem` bottom margin. Item headings and descriptions use `0.5rem 0` margins; prices use `1rem 0`.
- Item buttons use `0.75rem 1.5rem` padding and `4px` radius.
- The contact form has `600px` maximum width, `20px auto` margin, `20px` padding, a `1px` border, and `5px` radius. Labels use `10px 0 5px` margin.
- Contact inputs, textareas, and buttons use width `100%`, `10px` padding, `15px` bottom margin, `1px` borders, and `5px` radii. This combines `width: 100%` with content-box sizing because no global `box-sizing: border-box` rule exists; do not silently assume otherwise.
- Form feedback uses `15px` padding, `20px 0` margin, and a `5px` radius.
- The visually hidden helper is absolute and uses width/height `1px`, padding `0`, margin `-1px`, overflow hidden, `clip: rect(0, 0, 0, 0)`, nowrap, and border `0`.
- Normalize-specific spacing remains: body and form-control margins `0`; fieldset padding `0.35em 0.75em 0.625em`; legend, checkbox, radio, and Firefox button-inner padding `0`; search outline offset `-2px`; sub bottom `-0.25em`; sup top `-0.5em`.

## Motion and interaction rules

- Desktop navigation color transitions use `0.3s ease`.
- Hamburger bars transition all properties over `0.3s` with `cubic-bezier(0.6, 0.01, 0.05, 0.95)`.
- The off-canvas mobile navigation transitions transform over `0.3s ease-in-out`, hidden at `translateX(-100%)` and shown by `.active` at `translateX(0)`.
- Item cards transition transform and box-shadow over `0.2s`; item buttons transition background over `0.2s`.

## Required page structure

- Every page is an English HTML5 document with UTF-8 and responsive viewport metadata, the shared stylesheet in `<head>`, and a body ordered as: `.main-header`, `.mobile-nav`, `<main>`, `.main-footer`, then deferred scripts.
- Keep the shared header structure: `#hamburger.hamburger` containing three empty spans; `.logo > a > img`; `.nav-links > ul` with seven page links; and `.account-icons > ul` with search, user, and bag links.
- Each account link contains an `aria-hidden="true"` SVG `<use>` followed by a `.visually-hidden` text label. Continue using the `search`, `user`, and `bag` IDs from `icons.svg`.
- Keep the separate `#mobile-nav.mobile-nav` after the header. JavaScript state classes are `.is-active` on the hamburger and `.active` on mobile navigation.
- Ordinary pages contain one `h1` in `main`. Products and services additionally contain `#stripe-items.items-grid`, use `stripe-loader.js`, and identify their category via a `stripe-category` meta value (`physical` or `service`).
- The contact page instead contains `section.contact-form`, a Netlify-enabled `#contactForm` with its hidden `form-name`, labeled required name/email/message controls, submit button, and `#formFeedback.hidden`.
- Footer markup uses `footer.main-footer` containing the copyright paragraph. Sass styles the element selector `footer`, not `.main-footer`; preserve awareness of that mismatch.

## Existing HTML inconsistencies to preserve or explicitly resolve

- The home and services desktop menus order Products before Services. About, Blog, Contact, Gallery, and Products order Services before Products. All inner-page mobile menus order Services before Products, while the home mobile menu orders Products before Services.
- Home links use root-relative `/`. Other links are relative to the current file; header logo and account links use placeholder `#` targets.
- Home, About, Blog, Contact, and Gallery use the title `Document`; Products and Services use specific titles.
- `src/index.html` starts with a `<!-- Codex test. -->` comment before the doctype; inner pages do not.
- All current footers display copyright year `2024`. Do not update only a subset of pages.
