/* global WebImporter */
export default function parse(element, { document }) {
  // Find the inner container (usually .container), then the grid (w-layout-grid.grid-layout)
  const container = element.querySelector('.container') || element;
  const mainGrid = container.querySelector('.w-layout-grid.grid-layout');
  if (!mainGrid) return;

  // We'll treat the visible columns as major direct children of the grid, in DOM order
  // (e.g. [heading, paragraph, testimonialGrid])
  const gridChildren = Array.from(mainGrid.children);

  // First column: left side (heading + paragraph)
  let leftColNodes = [];
  // Find heading (p.h2-heading) and large paragraph
  const heading = mainGrid.querySelector('p.h2-heading');
  const paragraph = mainGrid.querySelector('p.paragraph-lg');
  if (heading) leftColNodes.push(heading);
  if (paragraph) leftColNodes.push(paragraph);

  // Second column: right side (testimonial grid)
  // There may be a child that's itself a .w-layout-grid within the main grid; treat that as right col
  let rightColNode = null;
  for (const node of gridChildren) {
    // This is the nested grid for testimonial, skip heading/paragraph
    if (
      node.classList.contains('w-layout-grid') &&
      node !== mainGrid
    ) {
      rightColNode = node;
      break;
    }
  }
  // Fallback if not found
  if (!rightColNode) {
    // If not found, just grab the last child
    rightColNode = gridChildren[gridChildren.length - 1];
  }

  // Construct the block table
  const headerRow = ['Columns (columns27)'];
  const contentRow = [
    leftColNodes,
    rightColNode ? [rightColNode] : []
  ];

  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
