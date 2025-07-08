/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid container which holds the column items
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  // Get all direct children of the grid as columns
  const columns = Array.from(grid.children);
  // The table header row: exactly one column as in the example
  const headerRow = ['Columns (columns32)'];
  // The columns row: one cell for each column
  const columnsRow = columns;
  // Compose the block table: first row is header (1 cell), second row is the columns
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  // Replace the original element with the new block table
  element.replaceWith(table);
}
