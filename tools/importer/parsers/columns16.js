/* global WebImporter */
export default function parse(element, { document }) {
  // Identify main content columns from the first grid
  const mainGrid = element.querySelector('.grid-layout.tablet-1-column');
  let col1 = null;
  let col2 = null;
  if (mainGrid) {
    const cols = mainGrid.querySelectorAll(':scope > div');
    if (cols.length >= 2) {
      col1 = cols[0];
      col2 = cols[1];
    }
  }

  // Identify the two image columns from the image grid
  const imageGrid = element.querySelector('.grid-layout.mobile-portrait-1-column');
  let img1 = null;
  let img2 = null;
  if (imageGrid) {
    const imgDivs = imageGrid.querySelectorAll(':scope > div');
    if (imgDivs.length >= 2) {
      img1 = imgDivs[0];
      img2 = imgDivs[1];
    }
  }

  // Prepare table: Header is a single-column row, then rows with two columns
  const cells = [
    ['Columns (columns16)'],
    [col1, col2],
    [img1, img2],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
