/* global WebImporter */
export default function parse(element, { document }) {
  // The header row - must be a single cell array exactly as in the spec
  const headerRow = ['Columns (columns11)'];

  // Find icon items
  const itemsWrapper = element.querySelector('.icon-block__items');
  let itemDivs = [];
  if (itemsWrapper) {
    itemDivs = Array.from(itemsWrapper.children).filter(
      el => el.classList.contains('teaser-icon-item')
    );
  }
  // Each column is a div containing the image and heading
  const columns = itemDivs.map(item => {
    const colDiv = document.createElement('div');
    const img = item.querySelector('img');
    const h4 = item.querySelector('h4');
    if (img) colDiv.appendChild(img);
    if (h4) colDiv.appendChild(h4);
    return colDiv;
  });

  // Table rows: header, then content (with as many columns as needed)
  const tableRows = [
    headerRow,         // single column header
    columns            // content row: each entry is a column
  ];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
