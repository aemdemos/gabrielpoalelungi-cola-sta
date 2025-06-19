/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content and image containers
  const main = element.querySelector('.hero-banner-image-descr.wrapper');

  // Left column: text content
  let leftCol = null;
  // Right column: image (prefer desktop)
  let rightCol = null;

  if (main) {
    const textContent = main.querySelector('.hero-banner-image-descr__content');
    if (textContent) leftCol = textContent;

    let imgWrapper = main.querySelector('.hero-banner-image-descr__image-wrapper.desktop-image');
    if (!imgWrapper) {
      imgWrapper = main.querySelector('.hero-banner-image-descr__image-wrapper.mobile-image');
    }
    if (imgWrapper) {
      const img = imgWrapper.querySelector('img');
      if (img) rightCol = img;
    }
  }

  // The table header must have a single cell, subsequent row has two cells
  const cells = [
    ['Columns (columns16)'], // Header row: exactly one cell
    [leftCol, rightCol],     // Content row: two columns
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
