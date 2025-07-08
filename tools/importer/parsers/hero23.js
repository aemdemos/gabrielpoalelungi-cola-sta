/* global WebImporter */
export default function parse(element, { document }) {
  // Find the active tab (visible hero variant), or fallback to the first tab
  const activeTab = element.querySelector('.w-tab-pane.w--tab-active') || element.querySelector('.w-tab-pane');
  if (!activeTab) return;

  // Find the grid containing all hero content
  const grid = activeTab.querySelector('.w-layout-grid');
  if (!grid) return;

  // Extract the image (optional) and all non-image content
  let imageEl = null;
  const contentEls = [];
  Array.from(grid.children).forEach(child => {
    if (child.tagName.toLowerCase() === 'img') {
      imageEl = child;
    } else {
      contentEls.push(child);
    }
  });

  // Compose the cell for the content row
  // If there's more than one non-image element, put them all (e.g. heading, subheading, etc)
  let contentCell;
  if (contentEls.length === 0) {
    contentCell = '';
  } else if (contentEls.length === 1) {
    contentCell = contentEls[0];
  } else {
    contentCell = contentEls;
  }

  // Build the table as in the markdown example
  const rows = [
    ['Hero (hero23)'],
    [imageEl ? imageEl : ''],
    [contentCell]
  ];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
