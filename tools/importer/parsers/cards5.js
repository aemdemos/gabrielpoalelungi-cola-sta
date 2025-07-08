/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per instructions
  const headerRow = ['Cards (cards5)'];
  // Gather all card elements (direct children)
  const cardLinks = element.querySelectorAll(':scope > a.card-link');
  const rows = [headerRow];

  cardLinks.forEach(card => {
    // --- Image cell ---
    // Per pattern, use the outer image wrapper div (contains the <img>)
    const imageWrapper = card.querySelector('.utility-aspect-3x2');
    // Defensive: fallback to the img if wrapper is missing
    let imgCell = null;
    if (imageWrapper) {
      imgCell = imageWrapper;
    } else {
      const img = card.querySelector('img');
      if (img) imgCell = img;
    }

    // --- Text cell ---
    // Compose the text cell from tag, heading, description, preserving order and markup
    const textWrapper = card.querySelector('.utility-padding-all-1rem');
    const cellContent = [];
    if (textWrapper) {
      // Tag (optional, uppercased small text)
      const tag = textWrapper.querySelector('.tag');
      if (tag) cellContent.push(tag);
      // Heading (optional)
      const heading = textWrapper.querySelector('h1, h2, h3, h4, h5, h6, .h4-heading');
      if (heading) cellContent.push(heading);
      // Description (optional)
      const desc = textWrapper.querySelector('p');
      if (desc) cellContent.push(desc);
    }
    rows.push([imgCell, cellContent]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
