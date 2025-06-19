/* global WebImporter */
export default function parse(element, { document }) {
  // Get the section containing the hero content
  const section = element.querySelector('section.hero-banner-image');
  
  // Get the image element (background image)
  const img = section ? section.querySelector('img.hero-banner-image__img') : null;

  // Get the text/title element
  let heading = '';
  if (section) {
    const textDiv = section.querySelector('.hero-banner-image__text');
    if (textDiv) {
      const title = textDiv.querySelector('.hero-banner-image__title');
      if (title) {
        // Ensure it's an h1 for semantic heading
        if (title.tagName.toLowerCase() === 'h1') {
          heading = title;
        } else {
          const h1 = document.createElement('h1');
          h1.innerHTML = title.innerHTML;
          heading = h1;
        }
      }
    }
  }

  // Build the table cells as per the Hero block structure (header, image, heading)
  const cells = [
    ['Hero'], // Header row exactly as in the example
    [img ? img : ''],    // Image row (empty string if missing)
    [heading ? heading : ''], // Heading row (empty string if missing)
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
