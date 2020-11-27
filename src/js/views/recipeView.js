// import icons from '../img/icons.svg'; // Parcel 1
// Parcel 2, para archivos estaticos como imagenes, videos, etc. Esto me da basicamente el url que me da parcel del nuevo archivo de los iconos dentro de dist
import icons from 'url:../../img/icons.svg';
import Fraction from 'fractional';
import View from './View.js';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage =
    "We couldn't find the recipe that you are looking for. Please try another one!";
  _message = '';

  // Esta funcion que es llamada desde controller.js con init(), lo que hace es recibir la funcion de controlRecipes que es la que renderiza el recipiente con toda la informacion. La idea es crear dos event listeners que esten atentos a por ejemplo cuando hago click a una receta. Al hacer click, este anchor tag, coloco un id en el url en formato por ejemplo "#gtge3f3f", entonces para detectar ese cambio en el url, escucho al evento de hashchange, una vez cambia el url, detecto eso, y procedo a llamar a la funcion que recibo aca de controlRecipes(), que la llamo y renderiza la nueva receta. Pero tambien escucho al LOAD de la pagina, ya que por ejemplo yo copio y pego el url de una receta, por ejemplo con el hash ya puesto, y cierro la pestana. Cuando ingrese, no se va a renderizar la receta. Ya que el hash no cambio, es el mismo que busque antes, entonces procedo a escuchar al evento de cuando termine de cargar la pagina, para que nuevamente llame a la funcion que renderiza la receta, sin importar que sea la misma.
  addHandlerRender(handler) {
    // Esto es igual a lo de abajo
    /*
      window.addEventListener('hashchange', showRecipe);
      window.addEventListener('load', showRecipe);
    */
    ['hashchange', 'load'].forEach(event => {
      window.addEventListener(event, handler);
    });
  }

  _generateMarkup() {
    return `
    <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        
        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            ${
              // Aca lo que hago es usar join, ya que map crea un nuevo array, y en este caso seria un array con multiples template strings, y yo quiero convertirlo en un solo string, asi que uno todas las trings con los LI, en una sola string usando JOIN, y uniendo sin espacios con ''
              this._data.ingredients
                .map(this._generateMarkUpIngredients)
                .join('')
            }   
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    `;
  }

  _generateMarkUpIngredients(ingredient) {
    return `
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${
      ingredient.quantity
        ? new Fraction.Fraction(ingredient.quantity).toString()
        : ''
    }</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.description}
    </div>
  </li>
    `;
  }
}

export default new RecipeView();
