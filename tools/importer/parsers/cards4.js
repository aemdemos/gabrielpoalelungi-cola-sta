/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Cards (cards4)'];
  const rows = [];

  // Find the grid of cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // --- Feature Card (first column, large card) ---
  const featureCard = gridChildren[0];
  if (featureCard) {
    // Image
    const imgDiv = featureCard.querySelector('.utility-aspect-1x1');
    const img = imgDiv && imgDiv.querySelector('img');
    // Tag (optional)
    const tagGroup = featureCard.querySelector('.tag-group');
    // Title (h2 or h3)
    const title = featureCard.querySelector('h2,h3');
    // Description
    const desc = featureCard.querySelector('p');
    const textCell = [];
    if (tagGroup) textCell.push(tagGroup);
    if (title) textCell.push(title);
    if (desc) textCell.push(desc);
    rows.push([
      img || '',
      textCell.length ? textCell : ''
    ]);
  }

  // --- Two stacked image cards (second column) ---
  const twoCardCol = gridChildren[1];
  if (twoCardCol) {
    const twoCards = Array.from(twoCardCol.querySelectorAll(':scope > a.utility-link-content-block'));
    twoCards.forEach(card => {
      // Image
      const imgDiv = card.querySelector('.utility-aspect-3x2');
      const img = imgDiv && imgDiv.querySelector('img');
      // Tag (optional)
      const tagGroup = card.querySelector('.tag-group');
      // Title (h3)
      const title = card.querySelector('h3');
      // Description
      const desc = card.querySelector('p');
      const textCell = [];
      if (tagGroup) textCell.push(tagGroup);
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      rows.push([
        img || '',
        textCell.length ? textCell : ''
      ]);
    });
  }

  // --- Six text cards, no images (third column) ---
  const textCardCol = gridChildren[2];
  if (textCardCol) {
    // Cards are direct children with class utility-link-content-block
    const textCards = Array.from(textCardCol.querySelectorAll(':scope > a.utility-link-content-block'));
    textCards.forEach(card => {
      const title = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = [];
      if (title) textCell.push(title);
      if (desc) textCell.push(desc);
      rows.push([
        '', // No image for these
        textCell.length ? textCell : ''
      ]);
    });
  }

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element with new table
  element.replaceWith(table);
}
