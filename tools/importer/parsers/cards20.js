/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards20) block
  const headerRow = ['Cards (cards20)'];

  // Get all direct card wrappers
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));
  const rows = cardDivs.map(card => {
    // Icon cell: SVG inside two div wrappers
    let iconDiv = card.querySelector(':scope > div > div.icon');
    if (!iconDiv) {
      // fallback: try any svg
      iconDiv = card.querySelector('svg');
    }
    // Text cell: usually a <p> after the icon
    let textEl = card.querySelector('p, span, div:not(:has(svg)):not([class*="icon"])');
    if (!textEl) {
      // fallback: create element from remaining text
      textEl = document.createElement('span');
      textEl.textContent = card.textContent.trim();
    }
    return [iconDiv, textEl];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
