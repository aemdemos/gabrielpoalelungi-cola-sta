/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout containing the two main columns (content and image)
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) grid = element.querySelector('div[class*="grid"]');

  let leftColContent = [];
  let rightColContent = [];

  if (grid) {
    const children = Array.from(grid.children);
    // Typically, columns are div first (with content), img second (visual)
    const left = children.find(child => child.tagName === 'DIV');
    const right = children.find(child => child.tagName === 'IMG');
    if (left) {
      leftColContent = Array.from(left.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
        if (n.nodeType === Node.ELEMENT_NODE) return true;
        return false;
      });
    }
    if (right) {
      rightColContent = [right];
    }
  } else {
    // Fallback: Just take all first-level divs and images
    const left = element.querySelector('div');
    if (left) {
      leftColContent = Array.from(left.childNodes).filter(n => {
        if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
        if (n.nodeType === Node.ELEMENT_NODE) return true;
        return false;
      });
    }
    const right = element.querySelector('img');
    if (right) {
      rightColContent = [right];
    }
  }

  // Mitigate edge case: if nothing found, use all non-nav and non-header direct children
  if (leftColContent.length === 0) {
    leftColContent = Array.from(element.childNodes).filter(n => {
      if (n.nodeType === Node.TEXT_NODE) return n.textContent.trim().length > 0;
      if (n.nodeType === Node.ELEMENT_NODE && !['NAV', 'HEADER'].includes(n.tagName)) return true;
      return false;
    });
  }

  // Build table structure: header row is block name, then one row with two columns
  const cells = [
    ['Columns (columns8)'],
    [leftColContent, rightColContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
