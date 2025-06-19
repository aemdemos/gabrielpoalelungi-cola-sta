/* global WebImporter */
export default function parse(element, { document }) {
  // Find the .hero-banner-video inside the .container
  const heroBanner = element.querySelector('.hero-banner-video');
  if (!heroBanner) {
    // fallback: just wrap all content in columns2
    const headerRow = ['Columns (columns2)'];
    const contentRow = [element];
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      contentRow
    ], document);
    element.replaceWith(table);
    return;
  }

  // Get left and right columns
  let leftCol = heroBanner.querySelector('.hero-banner-video__video-wrapper');
  let rightCol = heroBanner.querySelector('.hero-banner-video__text');

  // The transcript is a sibling to video in the left column – include it if present
  const transcript = heroBanner.querySelector('.hero-banner-video__transcript');
  if (leftCol && transcript) {
    // Wrap them in a fragment to combine into one cell
    const frag = document.createDocumentFragment();
    frag.appendChild(leftCol);
    frag.appendChild(transcript);
    leftCol = frag;
  }
  // If leftCol only, keep as is

  // Defensive fallback: if only a single column present
  const columns = [leftCol || null, rightCol || null].filter(Boolean);

  // The header must match exactly
  const headerRow = ['Columns (columns2)'];
  const cells = [headerRow, columns];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
