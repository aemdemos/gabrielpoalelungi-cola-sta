/* global WebImporter */
export default function parse(element, { document }) {
  // Find the teaser items
  const itemsWrapper = element.querySelector('.teaser-block__items');
  const itemElems = itemsWrapper ? itemsWrapper.querySelectorAll(':scope > .teaser-item') : [];
  
  // Table header
  const rows = [['Cards (cards1)']];

  // For each card, extract image and text content
  itemElems.forEach(card => {
    // First cell: Image (reference existing <img>)
    const img = card.querySelector('img');

    // Second cell: Text content (subtitle, title, desc, CTA)
    const content = card.querySelector('.teaser-item__content');
    const titleWrapper = content && content.querySelector('.teaser-item__title-wrapper');
    const subtitle = titleWrapper && titleWrapper.querySelector('.teaser-item__subtitle');
    const title = titleWrapper && titleWrapper.querySelector('.teaser-item__title');
    const descDiv = content && content.querySelector('.teaser-item__desc');
    const cta = content && content.querySelector('a.button, a.cta-link, a.cta-download-link');

    const cellContent = [];

    if (subtitle && subtitle.textContent.trim()) {
      // Subtitle (styled bold as in the screenshot)
      const subtitleStrong = document.createElement('strong');
      subtitleStrong.textContent = subtitle.textContent.trim();
      cellContent.push(subtitleStrong, document.createElement('br'));
    }
    if (title && title.textContent.trim()) {
      // Title
      const titleDiv = document.createElement('div');
      titleDiv.style.fontWeight = 'bold';
      titleDiv.textContent = title.textContent.trim();
      cellContent.push(titleDiv);
    }
    if (descDiv) {
      // Description (may contain <p> or just text)
      Array.from(descDiv.childNodes).forEach(node => {
        // Avoid using Node constants for compatibility
        if (node.nodeType === 1) { // ELEMENT_NODE
          cellContent.push(node);
        } else if (node.nodeType === 3 && node.textContent.trim()) { // TEXT_NODE
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          cellContent.push(p);
        }
      });
    }
    if (cta) {
      cellContent.push(cta);
    }

    rows.push([
      img,
      cellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
