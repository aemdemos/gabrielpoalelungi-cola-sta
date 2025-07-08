/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card anchors
  const cardElements = Array.from(element.querySelectorAll(':scope > a'));

  // Build the rows for each card: [imageCell, textCell]
  const rows = cardElements.map((card) => {
    // Image cell: wrapper div with image
    const imgCell = card.querySelector('.utility-aspect-2x3');
    // Text cell: tag/date group + heading
    const metaDiv = card.querySelector('.flex-horizontal');
    const heading = card.querySelector('h3, .h4-heading');
    const textCell = [];
    if (metaDiv) textCell.push(metaDiv);
    if (heading) textCell.push(heading);
    return [imgCell, textCell];
  });

  // The header row must have a single cell spanning 2 columns
  // WebImporter.DOMUtils.createTable does not expose colspan directly, so we will create the table and set colspan manually
  const cells = [['Cards (cards15)'], ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Set header cell to span 2 columns if there is at least one row with 2 columns
  const th = table.querySelector('th');
  if (th && rows.length > 0 && rows[0].length === 2) {
    th.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
