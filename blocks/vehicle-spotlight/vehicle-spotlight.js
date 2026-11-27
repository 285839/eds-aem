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
 * Authored rows are in model order: image, title, price, description, cta.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const [imageRow, titleRow, priceRow, descriptionRow, ctaRow] = [...block.children];

  // media column
  const media = document.createElement('div');
  media.className = 'vehicle-spotlight-media';
  const picture = imageRow?.querySelector('picture');
  if (picture) media.append(picture);

  // body column
  const body = document.createElement('div');
  body.className = 'vehicle-spotlight-body';

  const title = getCell(titleRow)?.textContent.trim();
  if (title) {
    const heading = document.createElement('h2');
    heading.textContent = title;
    body.append(heading);
  }

  const price = getCell(priceRow)?.textContent.trim();
  if (price) {
    const priceEl = document.createElement('p');
    priceEl.className = 'vehicle-spotlight-price';
    priceEl.textContent = price;
    body.append(priceEl);
  }

  const description = getCell(descriptionRow);
  if (description) {
    const text = document.createElement('div');
    text.className = 'vehicle-spotlight-description';
    text.append(...description.childNodes);
    body.append(text);
  }

  const link = ctaRow?.querySelector('a');
  if (link) {
    link.className = 'button primary';
    body.append(link);
  }

  block.replaceChildren(media, body);
}
