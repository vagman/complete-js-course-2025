import View from './View.js';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window ');
  _overlay = document.querySelector('.overlay');
  _btnOpenRecipeModal = document.querySelector('.nav__btn--add-recipe');
  _btnCloseRecipeModal = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHandlerShowRecipeModal();
    this._addHandlerHideRecipeModal();
  }

  toggleRecipeModal() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowRecipeModal() {
    this._btnOpenRecipeModal.addEventListener(
      'click',
      this.toggleRecipeModal.bind(this)
    );
  }

  _addHandlerHideRecipeModal() {
    this._btnCloseRecipeModal.addEventListener(
      'click',
      this.toggleRecipeModal.bind(this)
    );
    this._overlay.addEventListener('click', this.toggleRecipeModal.bind(this));
  }

  addHandlerUploadRecipe(handler) {
    this._parentElement.addEventListener('submit', e => {
      e.preventDefault();

      // FormData takes a form as an argument
      const dataArray = [...new FormData(this._parentElement)];
      // Convert Entries to Object
      const data = Object.fromEntries(dataArray);
      console.log(data);
      handler(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
