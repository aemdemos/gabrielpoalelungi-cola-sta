/* global WebImporter */
export default function parse(element, { document }) {
  // Find all .text-image-item direct children
  const items = Array.from(element.querySelectorAll(':scope > .text-image-item'));

  // Build columns: each is a cell (content + image)
  const columns = items.map(item => {
    // Get image (may be at start or end, doesn't matter for 2-col layout)
    const img = item.querySelector('img');
    // Get content container (may contain title + description, typically only description)
    const content = item.querySelector('.text-image-item__content');
    // The title may be empty, so only include if it contains text
    const title = content?.querySelector('.text-image-item__title');
    const desc = content?.querySelector('.text-image-item__description');
    const cellContent = [];
    if (desc) cellContent.push(desc);
    if (img) cellContent.push(img);
    return cellContent;
  });

  // Only create the columns row if there's at least one column
  // Header row as in spec
  const headerRow = ['Columns (columns21)'];
  // Table array: header, then columns
  const cells = [
    headerRow,
    columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
