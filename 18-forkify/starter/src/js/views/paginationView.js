import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _pagination = document.querySelector('.pagination');

  _generateMarkup() {
    // First of all, we have to calculate how many pages we have to render
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log('Pages:', numPages);

    // There are 4 diffrent scenarios for the two diffrent buttons to appear (next/previous page)

    // 1. We're in page 1 and there is at least 1 more page with recipes.
    if (this._data.page === 1 && numPages > 1) {
      return 'we are in page 1, there are more';
    }

    // 3. We're in the last page of the recipes.
    if (this._data.page === numPages && numPages > 1) {
      return 'Last page';
    }

    // 2. We're page X and there are more recipe's before x and after X.
    if (this._data.page < numPages) {
    }

    // 4. If no if blocks are executed above it means we're in page 1 and there NO other pages with recipes.
    return 'Page 1 and there NO other pages';
  }
}

export default new PaginationView();
