/**
 * Returns the content cell of an authored row, e.g. <div><div>content</div></div>.
 * @param {Element} row The row element
 * @returns {Element|null} The cell element
 */
function getCell(row) {
  return row?.firstElementChild ?? null;
}

/**
 * Decorates the vehicle spotlight block.
 * Authored rows are in model order: image, details, cta.
 * The details cell groups the text fields (title, price, description) in that order.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const [imageRow, detailsRow, ctaRow] = [...block.children];

  // media column
  const media = document.createElement('div');
  media.className = 'vehicle-spotlight-media';
  const picture = imageRow?.querySelector('picture');
  if (picture) media.append(picture);

  // body column
  const body = document.createElement('div');
  body.className = 'vehicle-spotlight-body';

  // grouped text fields, in model order: title, price, description
  const detailsCell = getCell(detailsRow);
  const [titleEl, priceEl, ...descriptionEls] = [...(detailsCell?.children ?? [])];

  const title = titleEl?.textContent.trim();
  if (title) {
    const heading = document.createElement('h2');
    heading.textContent = title;
    body.append(heading);
  }

  const price = priceEl?.textContent.trim();
  if (price) {
    const priceNode = document.createElement('p');
    priceNode.className = 'vehicle-spotlight-price';
    priceNode.textContent = price;
    body.append(priceNode);
  }

  if (descriptionEls.length) {
    const text = document.createElement('div');
    text.className = 'vehicle-spotlight-description';
    text.append(...descriptionEls);
    body.append(text);
  }

  const link = ctaRow?.querySelector('a');
  if (link) {
    link.className = 'button primary';
    body.append(link);
  }

  block.replaceChildren(media, body);
}
