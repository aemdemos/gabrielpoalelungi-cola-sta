/* global WebImporter */
export default function parse(element, { document }) {
  // Find columns (should be two columns for this block)
  const columns = Array.from(element.querySelectorAll(':scope > div > div.elementor-column'));
  if (columns.length < 2) return;

  function getLeftContent(col) {
    const wrap = col.querySelector(':scope > .elementor-widget-wrap');
    const widgets = Array.from(wrap.children).filter((el) =>
      !el.classList.contains('elementor-widget-divider')
    );
    const container = document.createElement('div');
    widgets.forEach((el) => container.appendChild(el));
    return container;
  }

  function getRightContent(col) {
    const wrap = col.querySelector(':scope > .elementor-widget-wrap');
    if (!wrap) return '';
    const imgs = wrap.querySelectorAll('img');
    if (imgs.length === 0) return '';
    if (imgs.length === 1) return imgs[0];
    const div = document.createElement('div');
    imgs.forEach(img => div.appendChild(img));
    return div;
  }

  const leftContent = getLeftContent(columns[0]);
  const rightContent = getRightContent(columns[1]);

  // Header row must match number of columns in the data row: ['Columns (columns11)', '']
  const headerRow = ['Columns (columns11)', ''];
  const row = [leftContent, rightContent];
  const table = WebImporter.DOMUtils.createTable([headerRow, row], document);
  element.replaceWith(table);
}
