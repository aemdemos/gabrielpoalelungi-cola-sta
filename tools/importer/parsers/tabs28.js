/* global WebImporter */
export default function parse(element, { document }) {
  // The header row is a single cell: 'Tabs'
  const headerRow = ['Tabs'];
  // Each tab link creates a new row: [tab label, tab content (empty string)]
  const tabLinks = Array.from(element.querySelectorAll(':scope > a'));
  const rows = tabLinks.map((a) => {
    // Prefer the inner <div> for label, fallback to anchor text
    const labelDiv = a.querySelector('div');
    const labelElem = labelDiv ? labelDiv : a;
    return [labelElem, ''];
  });
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
