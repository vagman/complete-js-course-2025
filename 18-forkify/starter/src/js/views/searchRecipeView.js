// Code specific for retrieving user input in search. also responsible for the event listener on 'Enter' click or Search button click.

class SearchRecipeView {
  #parentElement = document.querySelector('.search');

  getQuery = () => {
    const query = this.#parentElement.querySelector('.search__field').value;
    this.#clearSearchInput();
    return query;
  };

  #clearSearchInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }

  // Submiting a form will fire the event no matter if the user clicks 'Submit' or hits 'Enter'
  addHanlderSearch(handler) {
    this.#parentElement.addEventListener('submit', e => {
      e.preventDefault();
      return handler();
    });
  }
}

export default new SearchRecipeView();
