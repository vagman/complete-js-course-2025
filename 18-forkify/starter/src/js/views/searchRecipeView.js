// Code specific for retrieving user input in search. also responsible for the event listener on 'Enter' click or Search button click.

class SearchRecipeView {
  _parentElement = document.querySelector('.search');

  getQuery = () => {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearSearchInput();
    return query;
  };

  _clearSearchInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  // Submitting a form will fire the event no matter if the user clicks 'Submit' or hits 'Enter'
  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();
      return handler();
    });
  }
}

export default new SearchRecipeView();
