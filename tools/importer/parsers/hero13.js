/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row as in the example
  const headerRow = ['Hero (hero13)'];

  // --- 2nd row: Background image (optional) ---
  // Find the main background image: it's a .cover-image that is directly inside the first .w-layout-grid > div
  // Avoid the nested grid/card images
  let bgImg = null;
  const grid = element.querySelector('.w-layout-grid');
  if (grid) {
    // Find first direct child div of grid that contains an img.cover-image
    const gridDivs = grid.querySelectorAll(':scope > div');
    for (const div of gridDivs) {
      const img = div.querySelector(':scope > img.cover-image');
      // Exclude cover-images that are also .utility-aspect-1x1 (that is card image)
      if (img && !img.classList.contains('utility-aspect-1x1')) {
        bgImg = img;
        break;
      }
    }
  }

  // --- 3rd row: Content (headline, etc.) ---
  // Find the card body which contains heading, list, button, etc
  let cardBody = null;
  const card = element.querySelector('.card');
  if (card) {
    cardBody = card.querySelector('.card-body');
  }

  // Fallback: if cardBody is not found, just use the main container
  if (!cardBody) {
    const containers = element.querySelectorAll('.container');
    cardBody = containers[containers.length - 1] || element;
  }

  // Prepare the cells according to block spec: 1 col, 3 rows (header, bg, content)
  const cells = [
    headerRow,
    [bgImg || ''],
    [cardBody || '']
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
