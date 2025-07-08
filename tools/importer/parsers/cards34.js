/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in the example
  const headerRow = ['Cards (cards34)'];

  // Each card is a direct <a> child
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Image: first img in the card
    const image = card.querySelector('img');

    // Card body content: the inner div with all text etc.
    const cardBody = card.querySelector('.w-layout-grid > div');

    // Compose the text cell by referencing the correct child elements
    const textContent = [];

    // Row of tags and read time (optional, as appears in design)
    const tagRow = cardBody.querySelector('.flex-horizontal');
    if (tagRow) textContent.push(tagRow);

    // Title
    const heading = cardBody.querySelector('h3, .h4-heading');
    if (heading) textContent.push(heading);

    // Description
    const desc = cardBody.querySelector('p');
    if (desc) textContent.push(desc);

    // CTA (the last div containing 'Read', as a link)
    // But only if it is actually present as shown in the HTML
    const ctaDivs = cardBody.querySelectorAll('div');
    if (ctaDivs.length > 0) {
      const lastDiv = ctaDivs[ctaDivs.length - 1];
      if (lastDiv && lastDiv.textContent && lastDiv.textContent.trim().toLowerCase() === 'read') {
        const link = document.createElement('a');
        link.href = card.getAttribute('href') || '#';
        link.textContent = lastDiv.textContent.trim();
        textContent.push(link);
      }
    }

    // If nothing was found for textContent, maintain an empty cell
    return [image, textContent.length ? textContent : ''];
  });

  // Build the table as a cards block
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  element.replaceWith(table);
}
