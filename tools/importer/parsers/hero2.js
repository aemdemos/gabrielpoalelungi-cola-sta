/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container with the grid layout
  const container = element.querySelector('.container') || element;
  const grid = container.querySelector('.grid-layout') || container;
  const children = Array.from(grid.children);
  // Get the image (first img child)
  const img = children.find((child) => child.tagName === 'IMG');
  // Get the content block (the non-image child)
  const contentBlock = children.find((child) => child !== img);

  // Collect content elements from the content block
  const contentElements = [];
  if (contentBlock) {
    // Headings (in any order, keep their natural order)
    const headingElements = Array.from(contentBlock.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    headingElements.forEach(el => contentElements.push(el));
    // Subheading or paragraph (in this HTML, it's a p.subheading)
    const subHeadings = Array.from(contentBlock.querySelectorAll('p, .subheading'));
    // Avoid duplicates: add paragraphs if not already included
    subHeadings.forEach(el => {
      if (!contentElements.includes(el)) contentElements.push(el);
    });
    // Button group, if present
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) {
      contentElements.push(buttonGroup);
    } else {
      // Or standalone links under contentBlock
      const links = Array.from(contentBlock.querySelectorAll('a'));
      links.forEach(link => {
        // Only add if not already in contentElements
        if (!contentElements.includes(link)) contentElements.push(link);
      });
    }
  }

  // Construct table rows
  const rows = [
    ['Hero (hero2)'], // Header row, matches exactly the block name
    [img || ''],      // Image row, or empty if missing
    [contentElements] // Content row, list of all content elements in order
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
