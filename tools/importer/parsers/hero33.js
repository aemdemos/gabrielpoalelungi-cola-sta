/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the grid container with both the image and content
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // 2. Get the hero image and content block (assume image is IMG, content is DIV)
  let heroImg = null;
  let contentDiv = null;
  for (const child of Array.from(grid.children)) {
    if (child.tagName === 'IMG') heroImg = child;
    else if (child.tagName === 'DIV') contentDiv = child;
  }

  // 3. For the content cell, reference all content inside the contentDiv
  // This ensures any structure (eyebrow, tag, heading, author/date line) is preserved
  const contentParts = [];
  if (contentDiv) {
    // Push all children of contentDiv (keep their structure)
    Array.from(contentDiv.children).forEach(el => contentParts.push(el));
  }

  // 4. Build table
  const cells = [
    ['Hero (hero33)'],                // Header row as required
    [heroImg ? heroImg : ''],         // Image row
    [contentParts]                    // Content row (reference original elements)
  ];

  // 5. Replace original element with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
