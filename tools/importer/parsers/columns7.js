/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns block wrapper (tree-column-teaser-block)
  const block = element.querySelector('.tree-column-teaser-block');
  if (!block) return;

  // Get the immediate children which represent columns
  const columns = Array.from(block.querySelectorAll(':scope > .simple-teaser-item'));

  // Defensive: if no columns, do nothing
  if (columns.length === 0) return;

  // Map each column to content for the table cell
  const cells = columns.map((col) => {
    // For the text/paragraph column (has .tree-column-teaser-block__text)
    if (col.classList.contains('tree-column-teaser-block__text')) {
      // Use the entire element so all p's are included
      return col;
    }
    // For column with image and button
    const content = [];
    // Only reference existing elements
    const img = col.querySelector('img');
    if (img) content.push(img);
    // Find download link (a)
    const a = col.querySelector('a');
    if (a) content.push(a);
    // If no img or a, fallback to all children
    if (content.length === 0) {
      content.push(...col.childNodes);
    }
    return content;
  });

  // Header row must match exactly
  const headerRow = ['Columns (columns7)'];
  // Combine into table data
  const tableData = [headerRow, cells];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
