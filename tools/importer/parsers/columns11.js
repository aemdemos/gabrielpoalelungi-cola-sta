/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid containing the columns
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // 2. Get all direct children of the grid (each is a column)
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // 3. Build the header row (must be a single cell array)
  const headerRow = ['Columns (columns11)'];

  // 4. Build the columns row: each cell is the referenced column element
  const columnsRow = columns;

  // 5. Create the table as per the required structure: one header cell, then N columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,     // This will create a single <th> spanning all columns
    columnsRow     // This will create as many <td> as columns
  ], document);

  // 6. Replace the original element with the new block table
  element.replaceWith(table);
}
