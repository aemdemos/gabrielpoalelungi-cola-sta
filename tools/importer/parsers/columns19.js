/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  // Get immediate children of the grid - should be 3: left, ul, img
  const gridChildren = Array.from(grid.children);

  // Identify the left content (div), contact list (ul), and image (img)
  let leftCol = null;
  let contactList = null;
  let image = null;
  gridChildren.forEach(child => {
    if (child.tagName === 'DIV' && !leftCol) {
      leftCol = child;
    } else if (child.tagName === 'UL' && !contactList) {
      contactList = child;
    } else if (child.tagName === 'IMG' && !image) {
      image = child;
    }
  });

  // Build the cells array to match the example structure:
  // header row, first content row (2 columns), second content row (2 columns)
  const cells = [
    ['Columns (columns19)'],
    [leftCol, image],        // first row: leftCol and image
    [contactList, '']        // second row: contactList and empty right cell
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
