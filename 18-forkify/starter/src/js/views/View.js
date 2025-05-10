import icons from '../../img/icons.svg';
import spinner from '../../img/spinner.svg';

export default class View {
  _data;

  render(data) {
    // if (!data) won't work for an empty array []. only for undefined or null.
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderErrorMessage();
    }

    this._data = data;
    const markup = this._generateMarkup();

    // Initialization - Setting the container HTML to empty before filling with useful info in order to make the message dissapear: "Start by searching for a recipe or an ingredient. Have fun!"
    this._clearInnerHTML();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
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
