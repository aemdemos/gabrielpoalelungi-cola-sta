/* global WebImporter */
export default function parse(element, { document }) {
  // The block header as per example and block definition
  const headerRow = ['Hero (hero3)'];

  // No background image present in this HTML
  const bgRow = [''];

  // Find the .grid-layout inside the section
  const grid = element.querySelector('.grid-layout');
  let contentCell;
  if (grid) {
    // grid > two columns: 1st = heading/subheading, 2nd = buttons
    const gridChildren = grid.querySelectorAll(':scope > div');
    const contentArr = [];
    if (gridChildren.length >= 1) {
      const textCol = gridChildren[0];
      // Add all children of textCol (headings, paragraphs)
      textCol.childNodes.forEach((node) => {
        // Only append non-empty nodes
        if (node.nodeType === Node.ELEMENT_NODE || (node.nodeType === Node.TEXT_NODE && node.textContent.trim())) {
          contentArr.push(node);
        }
      });
    }
    if (gridChildren.length >= 2) {
      const ctaCol = gridChildren[1];
      // Add all CTAs (buttons/links)
      ctaCol.childNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          contentArr.push(node);
        }
      });
    }
    contentCell = [contentArr];
  } else {
    // fallback: use the element directly
    contentCell = [element];
  }

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    bgRow,
    contentCell
  ], document);
  element.replaceWith(table);
}
