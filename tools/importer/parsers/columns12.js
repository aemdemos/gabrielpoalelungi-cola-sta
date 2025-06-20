/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .elementor-container containing columns
  const container = element.querySelector('.elementor-container');
  if (!container) return;

  // Get all direct children that are columns
  const columns = Array.from(container.children).filter(c => c.classList.contains('elementor-column'));

  // For each column, get the .elementor-widget-wrap if present, else the column itself
  const columnContents = columns.map(col => {
    const widgetWrap = col.querySelector('.elementor-widget-wrap');
    return widgetWrap || col;
  });

  // Compose table: header row (single cell), then content row (one cell per column)
  const rows = [];
  rows.push(['Columns (columns12)']); // header row: exactly one cell
  rows.push([...columnContents]);     // content row: as many cells as columns

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  // Manually set colspan on the header row to span all content columns
  if (table.rows.length && table.rows[0].cells.length === 1 && columnContents.length > 1) {
    table.rows[0].cells[0].setAttribute('colspan', columnContents.length);
  }

  element.replaceWith(table);
}
