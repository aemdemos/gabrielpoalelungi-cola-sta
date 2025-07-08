/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header should match block name exactly
  const headerRow = ['Hero (hero7)'];

  // 2. Background image row: check for a background image (none in this HTML, so empty string)
  const bgRow = [''];

  // 3. Content row: should contain the heading, subheading (if any), paragraph, and CTA button
  // The relevant block is .grid-layout, which contains h2 and a div with a <p> and <a>
  let contentElements = [];
  const grid = element.querySelector('.grid-layout');
  if (grid) {
    // Find all direct children
    const children = Array.from(grid.children);
    // Heading (h2)
    const heading = children.find(el => el.tagName && el.tagName.toLowerCase() === 'h2');
    if (heading) contentElements.push(heading);
    // The next div contains the rest
    const contentDiv = children.find(el => el !== heading);
    if (contentDiv) {
      // Find paragraph and button inside contentDiv
      const p = contentDiv.querySelector('p');
      if (p) contentElements.push(p);
      const a = contentDiv.querySelector('a');
      if (a) contentElements.push(a);
    }
  } else {
    // fallback: push all children if grid not found
    contentElements = Array.from(element.children);
  }

  // Build the table
  const cells = [
    headerRow,
    bgRow,
    [contentElements]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
