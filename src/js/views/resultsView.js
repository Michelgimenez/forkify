import View from './View.js';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage =
    'No recipes found for your search. Please try again something like pizza... 😋';
  _message = '';

  // Esta funcion es llamada desde el padre de View.js, que dentro almacena en la variable de _DATA, toda la informacion recibida de las recetas, por lo tanto tengo acceso a la variable de _data, ya que la hereda tambien esta class. Entonces procedo a loopear sobre la lista de recetas, y por cada una, llamo a la funcion que me genera el html enviandole automaticamente cada receta, como uso map esto me crea un array con multiples strings, cosa que no quiero, yo quiero una sola string con todos los elementos dentro asi que uso join para unir todas las strings en una unica string.
  _generateMarkUp() {
    return this._data.map(this._generateMarkUpPreview).join('');
  }

  _generateMarkUpPreview(recipe) {
    return `
      <li class="preview">
      <a class="preview__link" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src="${recipe.image}" alt="${recipe.title}" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>
        `;
  }
}

export default new ResultsView();
