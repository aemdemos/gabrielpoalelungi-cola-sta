/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure dynamic extraction, preserve all content.
  // Block header must match example exactly.
  const headerRow = ['Columns (columns17)'];

  // Single column: the entire element is one logical block.
  // The container (element) has an image and a heading, both should be in the single cell.
  // Reference the actual img and h5, if present.
  const img = element.querySelector('img');
  const heading = element.querySelector('h5');

  // Compose the cell content (order as in DOM):
  const cellContent = [];
  if (img) cellContent.push(img);
  if (heading) cellContent.push(heading);

  // If neither present, fallback to the element's text content (very unlikely, but defensive)
  if (!img && !heading && element.textContent.trim()) {
    cellContent.push(document.createTextNode(element.textContent.trim()));
  }

  const rows = [headerRow, [cellContent]];

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
