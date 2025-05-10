import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      // Event Delegation: Use 'e' to figure out which button was clicked (back, next arrows)
      const pageButton = e.target.closest('.btn--inline');
      if (!pageButton) return;
      const goToPageNumber = +pageButton.dataset.goto;
      handler(goToPageNumber);
    });
  }

  _generateMarkup() {
    // First of all, we have to calculate how many pages we have to render
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    // There are 4 diffrent scenarios for the two diffrent buttons to appear (next/previous page)

    // TODO: DRY code is violated here. Make 2 const variables inside the function that store the buttons and use the accordingly.

    // 1. We're in page 1 and there is at least 1 more page with recipes.
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // 3. We're in the last page of the recipes.
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // 2. We're page X and there are more recipe's before x and after X.
    if (currentPage < numPages) {
      return `
        <button data-goto="${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${currentPage - 1}</span>
        </button>
        <button data-goto="${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span>Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // 4. If no above if block is executed,  it means we're in page 1 and there NO other pages with recipes.
    return '';
  }
}

export default new PaginationView();
