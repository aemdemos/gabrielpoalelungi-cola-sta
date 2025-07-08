/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero25)'];

  // Find the main grid (the one with both content and image)
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column');

  // Defensive: If grid not found, do nothing
  if (!mainGrid) return;

  // Find image (background/hero image)
  let imageEl = null;
  // Find content (headline, paragraph, CTAs)
  let contentEl = null;
  // The grid may contain containers that hold the content or image directly
  for (const child of Array.from(mainGrid.children)) {
    if (child.tagName.toLowerCase() === 'img') {
      imageEl = child;
    } else if (
      child.querySelector('h1, h2, h3, h4, h5, h6, .rich-text, .button-group, p')
    ) {
      contentEl = child.querySelector('h1, h2, h3, h4, h5, h6, .rich-text, .button-group, p').parentElement;
    }
  }

  // 2nd row: image
  const imageRow = [imageEl || ''];

  // 3rd row: content (headline, subheading, CTAs, in order)
  let contentParts = [];
  if (contentEl) {
    // Headline (heading)
    const heading = contentEl.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentParts.push(heading);
    // Subheading/Paragraph
    const rich = contentEl.querySelector('.rich-text, .paragraph-lg');
    if (rich) contentParts.push(rich);
    // CTA Buttons
    const buttonGroup = contentEl.querySelector('.button-group');
    if (buttonGroup) contentParts.push(buttonGroup);
  }
  const contentRow = [contentParts.length > 0 ? contentParts : ''];

  // Compose table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  element.replaceWith(table);
}
