/* global WebImporter */
export default function parse(element, { document }) {
  // Find all top-level .elementor-inner-column columns inside the section
  // For robustness, get all columns inside the first .elementor-inner-section
  let innerSection = element.querySelector('.elementor-inner-section > .elementor-container');
  if (!innerSection) innerSection = element.querySelector('.elementor-container');
  const columns = innerSection ? Array.from(innerSection.querySelectorAll(':scope > .elementor-column')) : [];
  if (!columns.length) return;

  // Helper to extract all direct widget content from a column
  function getColumnContent(col) {
    const wrap = col.querySelector('.elementor-widget-wrap');
    if (!wrap) return [];
    // Only direct children widgets (not nested)
    const widgets = Array.from(wrap.children).filter(e => e.classList.contains('elementor-element'));
    // Reference content of .elementor-widget-container if present
    return widgets.map(widget => {
      const container = widget.querySelector('.elementor-widget-container');
      // If container has a single element, return that element
      if (container && container.children.length === 1) {
        return container.firstElementChild;
      }
      // If container exists, but has more, return the whole container
      if (container) return container;
      // Otherwise, fallback to widget
      return widget;
    }).filter(Boolean);
  }

  // Table header as per requirement
  const rows = [
    ['Columns (columns24)']
  ];

  // Second row: one cell per column, as array of referenced elements
  const colCells = columns.map(col => getColumnContent(col));
  rows.push(colCells);

  // Create the columns block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
