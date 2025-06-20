/* global WebImporter */
export default function parse(element, { document }) {
  // The four column containers are direct children of .elementor-container
  // inside the given section.
  let columns = [];
  const container = element.querySelector(':scope > .elementor-container');
  if (container) {
    columns = Array.from(container.querySelectorAll(':scope > .elementor-column'));
  } else {
    // fallback: direct columns if no .elementor-container
    columns = Array.from(element.querySelectorAll(':scope > div.elementor-column'));
  }

  // Always ensure 4 columns
  while (columns.length < 4) {
    columns.push(null);
  }

  function getColumnContent(colDiv) {
    if (!colDiv) return '';
    const wrap = colDiv.querySelector('.elementor-widget-wrap');
    if (!wrap) return '';
    const widgets = wrap.querySelectorAll(':scope > .elementor-element');
    const colContent = [];
    widgets.forEach(widget => {
      const container = widget.querySelector(':scope > .elementor-widget-container');
      if (container) {
        // Nav menu: only the visible nav
        if (widget.classList.contains('elementor-widget-nav-menu')) {
          const nav = container.querySelector('nav');
          if (nav) colContent.push(nav);
          return;
        }
        // Icon list: use ul
        if (widget.classList.contains('elementor-widget-icon-list')) {
          const ul = container.querySelector('ul');
          if (ul) colContent.push(ul);
          return;
        }
        // Heading
        const heading = container.querySelector('h1, h2, h3, h4, h5, h6');
        if (heading) { colContent.push(heading); return; }
        // Paragraph
        const para = container.querySelector('p');
        if (para) { colContent.push(para); return; }
        // Images: anchor with img or picture
        const anchor = container.querySelector('a');
        if (anchor && (anchor.querySelector('img') || anchor.querySelector('picture'))) {
          colContent.push(anchor);
          return;
        }
        // Pictures directly
        const picture = container.querySelector('picture');
        if (picture) { colContent.push(picture); return; }
        // Images directly
        const img = container.querySelector('img');
        if (img) { colContent.push(img); return; }
        // Spacer: skip
        if (widget.classList.contains('elementor-widget-spacer')) return;
        // Anything else: include the container
        colContent.push(container);
      } else {
        colContent.push(widget);
      }
    });
    // Filter out empty/meaningless paragraphs
    return colContent.filter(c => {
      if (typeof c === 'string') return c.trim().length > 0;
      if (c.nodeType === Node.ELEMENT_NODE) {
        if (c.tagName === 'P' && c.textContent.trim() === '') return false;
        return true;
      }
      return false;
    });
  }

  // Compose row: one cell per column (always 4)
  const row = columns.map(colDiv => {
    const content = getColumnContent(colDiv);
    if (Array.isArray(content) && content.length === 0) return '';
    if (Array.isArray(content) && content.length === 1) return content[0];
    if (Array.isArray(content)) return content;
    return content;
  });

  const headerRow = ['Columns (columns4)'];
  const tableRows = [headerRow, row];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
