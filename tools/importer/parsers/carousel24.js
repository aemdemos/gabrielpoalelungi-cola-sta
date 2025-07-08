/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per example
  const headerRow = ['Carousel (carousel24)'];

  // Locate the card body (where content resides)
  const cardBody = element.querySelector('.card-body');
  if (!cardBody) {
    // If no cardBody, fallback to blank slide (still output table for resilience)
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ['', '']
    ], document);
    element.replaceWith(table);
    return;
  }

  // Extract image for first cell
  const img = cardBody.querySelector('img');
  // Extract heading for text cell (if exists)
  const heading = cardBody.querySelector('.h4-heading');

  // Build cells for the slide row
  const rowCells = [
    img || '', // image cell (mandatory in spec, but fallback if missing)
    heading || '' // text cell (optional)
  ];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    rowCells
  ], document);

  element.replaceWith(table);
}
