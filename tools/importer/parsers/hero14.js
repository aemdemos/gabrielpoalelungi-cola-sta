/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header: block name must match exactly
  const headerRow = ['Hero (hero14)'];

  // 2. Get the immediate grid children (image column and content column)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');

  // 3. Find the background image (should be the first grid child with an <img>)
  let bgImg = null;
  for (const child of gridChildren) {
    const img = child.querySelector('img');
    if (img) {
      bgImg = img;
      break;
    }
  }

  // 4. Find the content block (should be the one with the <h1> headline)
  let contentCell = null;
  for (const child of gridChildren) {
    const h1 = child.querySelector('h1');
    if (h1) {
      // The inner wrapper div contains all content (heading, buttons)
      // If there is a single div, use it. Else use the child itself.
      const wrappers = child.querySelectorAll(':scope > div');
      if (wrappers.length > 0) {
        contentCell = wrappers[0];
      } else {
        contentCell = child;
      }
      break;
    }
  }

  // If neither background image nor content found, do not proceed
  if (!bgImg && !contentCell) return;

  // 5. Compose the block table (3 rows, 1 column)
  const tableRows = [
    headerRow,
    [bgImg ? bgImg : ''],
    [contentCell ? contentCell : '']
  ];

  // 6. Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
