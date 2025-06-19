/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for columns block, as in the example
  const headerRow = ['Columns (columns22)'];

  // 2. Extract all immediate .teaser-icon-item children
  const items = Array.from(element.querySelectorAll(':scope > .teaser-icon-item'));

  // 3. Edge case: No items, fallback to empty cell(s)
  if (items.length === 0) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ['']
    ], document);
    element.replaceWith(table);
    return;
  }

  // 4. For each teaser-icon-item, build a cell with the icon and the description (from the p)
  const cells = items.map((item) => {
    // Find the icon (img)
    const img = item.querySelector('img.teaser-icon-item__icon');
    // Find the desc (p), safely
    let desc = '';
    const descDiv = item.querySelector('.teaser-icon-item__desc');
    if (descDiv) {
      const p = descDiv.querySelector('p');
      if (p) desc = p;
    }
    // Compose cell contents
    const contents = [];
    if (img) contents.push(img);
    if (img && desc) contents.push(document.createElement('br'));
    if (desc) contents.push(desc);
    return contents;
  });

  // 5. Create the table: header, then a single row with a cell for each column
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cells
  ], document);

  // 6. Replace the original element with the table
  element.replaceWith(table);
}
