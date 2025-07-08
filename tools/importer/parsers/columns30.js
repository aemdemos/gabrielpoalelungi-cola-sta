/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a single cell only
  const headerRow = ['Columns (columns30)'];
  // Get all immediate child divs (columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  // For each column, extract the image if present, otherwise the column
  const contentRow = columns.map((col) => {
    const img = col.querySelector('img');
    return img || col;
  });
  // Ensure the header row is one cell, content row matches number of columns
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
