/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare the header
  const headerRow = ['Columns (columns6)'];

  // Get the relevant wrapper containing the columns
  const root = element.querySelector('.hero-banner-image-descr');
  if (!root) return;

  // Find left (text) and right (image) columns
  const content = root.querySelector('.hero-banner-image-descr__content');
  const imageWrapper = root.querySelector('.hero-banner-image-descr__image-wrapper');

  // Defensive fallback for missing children
  let leftCell = content;
  if (leftCell && leftCell.querySelector('.hero-banner-image-descr__text')) {
    leftCell = leftCell.querySelector('.hero-banner-image-descr__text');
  }
  // If leftCell is still null or missing, fallback to root's first div
  if (!leftCell) {
    const fallback = root.querySelector('div');
    if (fallback) leftCell = fallback;
  }

  let rightCell = null;
  if (imageWrapper && imageWrapper.querySelector('img')) {
    rightCell = imageWrapper.querySelector('img');
  } else if (imageWrapper) {
    rightCell = imageWrapper;
  } else {
    // Fallback to any img in the root
    const fallbackImg = root.querySelector('img');
    if (fallbackImg) rightCell = fallbackImg;
  }

  // Compose the data row
  const dataRow = [leftCell, rightCell];

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    dataRow
  ], document);

  element.replaceWith(table);
}
