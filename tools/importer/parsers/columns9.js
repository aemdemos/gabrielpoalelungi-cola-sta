/* global WebImporter */
export default function parse(element, { document }) {
  // Find all immediate columns
  let columns = Array.from(element.querySelectorAll(':scope > .two-column-icon-item__col'));
  // Fallback if no explicit columns
  if (columns.length === 0) {
    columns = Array.from(element.children);
  }
  // For each column, use the .icon-item element if present, else the column itself
  const cells = columns.map((col) => {
    const iconItem = col.querySelector('.icon-item') || col;
    return iconItem;
  });
  // Compose the table: single header cell, then one row with all columns
  const tableArr = [
    ['Columns (columns9)'],
    cells
  ];
  const table = WebImporter.DOMUtils.createTable(tableArr, document);
  element.replaceWith(table);
}