/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the three columns (defensive for missing ones)
  const columns = Array.from(element.querySelectorAll(':scope > div > div'));
  while (columns.length < 3) columns.push(document.createElement('div'));

  // For each column, take its .elementor-widget-wrap if found
  const getWrap = (col) => col.querySelector('.elementor-widget-wrap') || col;
  const col1 = getWrap(columns[0]);
  const col2 = getWrap(columns[1]);
  const col3 = getWrap(columns[2]);

  // Build the table: header is a single cell row, content row is three cells
  const table = document.createElement('table');
  // Header row - one cell, spanning three columns
  const trHeader = document.createElement('tr');
  const th = document.createElement('th');
  th.colSpan = 3;
  th.textContent = 'Columns (columns20)';
  trHeader.appendChild(th);
  table.appendChild(trHeader);

  // Content row
  const trContent = document.createElement('tr');
  [col1, col2, col3].forEach((col) => {
    const td = document.createElement('td');
    td.append(col);
    trContent.appendChild(td);
  });
  table.appendChild(trContent);

  element.replaceWith(table);
}