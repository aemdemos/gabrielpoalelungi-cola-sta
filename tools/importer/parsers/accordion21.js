/* global WebImporter */
export default function parse(element, { document }) {
  // Compose block table header
  const headerRow = ['Accordion (accordion21)'];
  const rows = [headerRow];

  // Each accordion item is inside a .divider (direct children of element)
  const dividers = element.querySelectorAll(':scope > .divider');

  dividers.forEach((divider) => {
    // The structure for each item should be:
    //   .w-layout-grid > [0]=title(.h4-heading), [1]=content(.rich-text)
    const grid = divider.querySelector(':scope > .w-layout-grid');
    if (!grid || grid.children.length < 2) return;
    const title = grid.children[0];
    const content = grid.children[1];
    // Only push if both elements exist
    if (title && content) {
      rows.push([title, content]);
    }
  });

  // Replace only if rows found besides header
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
