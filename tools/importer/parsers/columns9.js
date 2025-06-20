/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get all immediate columns from an Elementor section
  function getColumns(section) {
    // Typical Elementor: section > .elementor-container > .elementor-column
    const container = section.querySelector(':scope > .elementor-container');
    if (container) {
      return Array.from(container.querySelectorAll(':scope > .elementor-column'));
    }
    // Fallback: just find direct .elementor-column
    return Array.from(section.querySelectorAll(':scope > .elementor-column'));
  }

  // Helper: Extracts all meaningful content (preserves order and text nodes)
  function getColumnBlockContent(column) {
    const wrap = column.querySelector('.elementor-widget-wrap') || column;
    // Collect all child nodes, including text
    const nodes = [];
    wrap.childNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip style, script, link
        if (!['STYLE', 'SCRIPT', 'LINK'].includes(node.tagName)) nodes.push(node);
      } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Wrap text node in a <span> so it's not lost in table
        const span = document.createElement('span');
        span.textContent = node.textContent;
        nodes.push(span);
      }
    });
    if (nodes.length === 0) return '';
    if (nodes.length === 1) return nodes[0];
    return nodes;
  }

  // Helper: For the map section, get the first iframe in a column and turn it into a link
  function iframeToLink(column) {
    const iframe = column.querySelector('iframe');
    if (!iframe) return '';
    // Prefer data-src-cmplz (actual map src), fallback to src
    const src = iframe.getAttribute('data-src-cmplz') || iframe.getAttribute('src');
    if (!src || src === 'about:blank') return '';
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    a.target = '_blank';
    return a;
  }

  // Find all top-level .elementor-section blocks
  let sections = Array.from(element.querySelectorAll(':scope > section.elementor-section'));
  // Fallback: search deeper for cases where there's a wrapper div
  if (sections.length === 0) {
    sections = Array.from(element.querySelectorAll('section.elementor-section'));
  }

  // Build rows for the Columns (columns9) block
  const cells = [];
  // Header row as exactly one cell
  cells.push(['Columns (columns9)']);

  // 1st row: Contact info and form (first section)
  if (sections[0]) {
    const cols = getColumns(sections[0]);
    const left = cols[0] ? getColumnBlockContent(cols[0]) : '';
    const right = cols[1] ? getColumnBlockContent(cols[1]) : '';
    cells.push([left, right]);
  }

  // 2nd row: Telefon / Email card (second section)
  if (sections[1]) {
    const cols = getColumns(sections[1]);
    const left = cols[0] ? getColumnBlockContent(cols[0]) : '';
    const right = cols[1] ? getColumnBlockContent(cols[1]) : '';
    cells.push([left, right]);
  }

  // 3rd row: Adresa RaMi Spa (third section)
  if (sections[2]) {
    const cols = getColumns(sections[2]);
    const left = cols[0] ? getColumnBlockContent(cols[0]) : '';
    const right = cols[1] ? getColumnBlockContent(cols[1]) : '';
    cells.push([left, right]);
  }

  // 4th row: Google maps (as links; fourth section)
  if (sections[3]) {
    const cols = getColumns(sections[3]);
    const left = cols[0] ? iframeToLink(cols[0]) : '';
    const right = cols[1] ? iframeToLink(cols[1]) : '';
    cells.push([left, right]);
  }

  // Remove trailing rows that are completely empty (except the header)
  while (cells.length > 1 && (!cells[cells.length-1][0] && !cells[cells.length-1][1])) {
    cells.pop();
  }

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
