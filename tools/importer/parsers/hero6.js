/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must match exactly
  const headerRow = ['Hero (hero6)'];
  
  // 1st content cell: Background image (optional)
  // Find the first immediate .w-layout-grid child div that contains an img
  let bgImgEl = null;
  const gridDivs = element.querySelectorAll(':scope > .w-layout-grid > div');
  for (const div of gridDivs) {
    const img = div.querySelector('img');
    if (img) {
      bgImgEl = img;
      break;
    }
  }

  // 2nd content cell: Heading, subheading, CTA(s)
  // Find the card with main hero text and actions
  let contentEls = [];
  const card = element.querySelector('.card');
  if (card) {
    // Heading (h1)
    const h1 = card.querySelector('h1');
    if (h1) contentEls.push(h1);
    // Subheading (p) - only include if not empty
    const sub = card.querySelector('p');
    if (sub && sub.textContent.trim()) contentEls.push(sub);
    // Call-to-action buttons (any direct <a> children of .button-group)
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) {
      const btns = btnGroup.querySelectorAll('a');
      if (btns.length > 0) {
        // Include the button group as-is for semantic grouping
        contentEls.push(btnGroup);
      }
    }
  }

  // Ensure empty cell if nothing found for bg image/content
  const rows = [
    headerRow,
    [bgImgEl ? bgImgEl : ''],
    [contentEls.length > 0 ? contentEls : '']
  ];

  // Create the table and replace the original element
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
