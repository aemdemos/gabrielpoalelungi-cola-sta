/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the visible/active tab pane
  const activeTab = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activeTab) return;

  // Find the grid with cards (cards are direct children)
  const grid = activeTab.querySelector('.w-layout-grid, .grid-layout');
  if (!grid) return;
  
  const headerRow = ['Cards (cards22)'];
  const rows = [headerRow];

  // Each card is a direct child <a> (or similar) element
  Array.from(grid.children).forEach(card => {
    // Find image (if any) -- first <img> in this card
    const img = card.querySelector('img');
    
    // For text content: collect all elements except any image containers
    // We'll take everything except elements (or wrappers) containing <img>
    // This ensures we retain all text content and structure (headings, divs, etc)
    const textFragments = [];
    Array.from(card.children).forEach(child => {
      if (!child.querySelector('img') && child.tagName !== 'IMG') {
        // Check if child has real content
        if (child.textContent && child.textContent.trim().length > 0) {
          textFragments.push(child);
        }
      }
    });
    // If we have no text fragments, fallback to card.textContent
    let textCell = '';
    if (textFragments.length > 0) {
      textCell = textFragments.length === 1 ? textFragments[0] : textFragments;
    } else {
      textCell = card.textContent.trim();
    }
    rows.push([img || '', textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
