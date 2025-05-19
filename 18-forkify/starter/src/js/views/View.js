import icons from '../../img/icons.svg';
import spinner from '../../img/spinner.svg';

export default class View {
  _data;

  render(data, render = true) {
    // if (!data) won't work for an empty array []. only for undefined or null.
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErrorMessage();
    }

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // Initialization - Setting the container HTML to empty before filling with useful info in order to make the message dissapear: "Start by searching for a recipe or an ingredient. Have fun!"
    this._clearInnerHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(
      this._parentElement.querySelectorAll('*')
    );

    // Checking which elements of the pages have changed and push them to an array
    // Then render only them when clicking on a diffrent recipe
    newElements.forEach((newElement, index) => {
      const currentElement = currentElements[index];
      // Updates changed TEXT
      if (
        !newElement.isEqualNode(currentElement) &&
        newElement.firstChild?.nodeValue.trim() !== ''
      ) {
        currentElement.textContent = newElement.textContent;
      }
      // Updates changed ATTRIBUTES
      if (!newElement.isEqualNode(currentElement))
        Array.from(newElement.attributes).forEach(attribute =>
          currentElement.setAttribute(attribute.name, attribute.value)
        );
    });
  }

  _clearInnerHTML() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner = () => {
    const markup = `
      <div class="spinner">
        ${spinner}
      </div>
    `;
    this._clearInnerHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderErrorMessage = (errorMessage = this._errorMessage) => {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-smile"></use>
          </svg>
        </div>
        <p>${errorMessage}</p>
      </div>
      `;
    this._clearInnerHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };

  renderSuccessMessage = (sucessMessage = this._successMessage) => {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${sucessMessage}</p>
      </div>
      `;
    this._clearInnerHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  };
}
