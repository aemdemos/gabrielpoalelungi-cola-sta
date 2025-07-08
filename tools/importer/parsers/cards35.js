/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare header as in example
  const headerRow = ['Cards (cards35)'];

  // In this HTML, each card is a .utility-aspect-1x1 containing an img.
  const cards = Array.from(element.querySelectorAll(':scope > .utility-aspect-1x1'));

  // Each row: [image, empty string for text col]
  const rows = cards.map(card => {
    const img = card.querySelector('img');
    // Defensive: If no image, leave cell empty
    return [img || '', ''];
  });

  // Construct table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
