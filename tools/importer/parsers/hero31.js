/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the correct wrapper for extraction
  const grid = element.querySelector('.w-layout-grid') || element;
  const children = Array.from(grid.children);

  // Find content pieces
  let title = null;
  let tags = null;
  let description = null;

  children.forEach(child => {
    if (!title && /^H[1-6]$/.test(child.tagName)) {
      title = child;
    }
    // tags: find cluster of .tag elements (could be in a container)
    if (!tags && child.querySelectorAll && child.querySelectorAll('.tag').length > 0) {
      tags = child;
    }
    // description: rich text paragraphs
    if (!description && child.querySelector && child.querySelector('.rich-text')) {
      description = child.querySelector('.rich-text');
    }
  });

  // Compose main cell content, including author-label if present
  // (first element is likely the author name, e.g. 'Taylor Brooks')
  const mainCellContent = [];
  // If the first child is plain text, include it
  if (children.length && children[0].classList && children[0].classList.contains('paragraph-xl')) {
    mainCellContent.push(children[0]);
  }
  if (tags) mainCellContent.push(tags);
  if (title) mainCellContent.push(title);
  if (description) mainCellContent.push(description);

  // Table with exactly 3 rows, 1 column per the specification
  const headerRow = ['Hero (hero31)'];
  const backgroundRow = ['']; // No background image
  const contentRow = [mainCellContent];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    backgroundRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
