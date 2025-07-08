/* global WebImporter */
export default function parse(element, { document }) {
  // Accordion block table header
  const headerRow = ['Accordion (accordion18)'];

  // Find all accordion items (direct children with class 'accordion')
  const items = Array.from(element.querySelectorAll(':scope > .accordion'));

  // Build rows: each row = [title, content]
  const rows = items.map((item) => {
    // Title: the .w-dropdown-toggle .paragraph-lg child
    let titleCell = '';
    const toggle = item.querySelector('.w-dropdown-toggle');
    if (toggle) {
      const titleDiv = toggle.querySelector('.paragraph-lg');
      if (titleDiv) titleCell = titleDiv;
    }
    // Content: the .w-dropdown-list .rich-text child (or fallback to any content inside .w-dropdown-list)
    let contentCell = '';
    const dropdownList = item.querySelector('.w-dropdown-list');
    if (dropdownList) {
      const richText = dropdownList.querySelector('.rich-text');
      if (richText) {
        contentCell = richText;
      } else {
        // fallback: use the dropdownList's content div or itself
        const contentDiv = dropdownList.querySelector('div');
        if (contentDiv) {
          contentCell = contentDiv;
        } else {
          contentCell = dropdownList;
        }
      }
    }
    return [titleCell, contentCell];
  });

  // Create and replace with accordion block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
