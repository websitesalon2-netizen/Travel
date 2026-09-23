# Kashmiré Voyages — Manager CMS Update

This update fixes the missing Manager CMS controls and changes Live Mountain Intel behavior.

## Manager Desk
A new **Website Content CMS** tab is available inside Manager Desk. It provides normal forms for:
- Home / Hero heading, badge, description and hero background image
- Curated Kashmir Itineraries heading/description
- The Kashmir Experience Marketplace heading/description
- Hotels / Chalets / Luxury Houseboats heading
- The Soul of Kashmiré Voyages heading and paragraphs
- Glimpses of Paradise heading/description
- **When Should You Visit Paradise?** heading, description and four seasonal images
- **The Imperial Wazwan & Culinary Heritage** / Kashmiri Flavors & Traditional Feast heading, description and culinary banner image

Image fields have both **URL** and **Upload from Device** controls.

Website content is synchronized through Firestore at `settings/websiteContent`.

## Live Mountain Intel
The live mountain status panel is no longer displayed automatically at the top of every page. A public navigation item called **Live Mountain Intel** opens it only when a visitor clicks it.

## Deployment
Replace the project files with this package, commit and push to GitHub, then wait for GitHub Actions/GitHub Pages to finish deploying. Hard refresh the browser with Ctrl+F5 after deployment.
