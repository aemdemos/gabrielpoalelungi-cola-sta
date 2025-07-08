/* global WebImporter */
export default function parse(element, { document }) {
  // The block structure is:
  // 1. Header row: ["Hero (hero29)"]
  // 2. Row: [image] (decorative image)
  // 3. Row: [content: heading, subhead, paragraph, cta)

  // Get the main container with the grid layout
  const grid = element.querySelector('.grid-layout');

  let imageEl = null;
  let contentEl = null;

  if (grid) {
    // Get all direct children of the grid layout
    const children = Array.from(grid.children);
    for (const child of children) {
      if (!imageEl && child.querySelector('img')) {
        imageEl = child.querySelector('img');
      } else if (!contentEl && (child.querySelector('h1, h2, h3, p, a, .eyebrow'))) {
        contentEl = child;
      }
    }
  }

  // Fallbacks if not found
  if (!imageEl) {
    imageEl = element.querySelector('img');
  }
  if (!contentEl) {
    contentEl = element.querySelector('div');
  }

  // 1. Header row
  const headerRow = ['Hero (hero29)'];

  // 2. Image row
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row
  // Collect ONLY direct children of contentEl, in their original order
  let contentCell = [];
  if (contentEl) {
    // Filter out empty text nodes
    contentCell = Array.from(contentEl.childNodes).filter(node => {
      return (
        node.nodeType === 1 ||
        (node.nodeType === 3 && node.textContent && node.textContent.trim() !== '')
      );
    });
  } else {
    contentCell = [''];
  }

  // Build the table
  const cells = [
    headerRow,
    imageRow,
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}