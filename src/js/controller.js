import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

import 'core-js/stable'; // Para pasar a es5 las variables, arrow functions, etc
import 'regenerator-runtime/runtime'; // Para pasar el async/await a es5
import { async } from 'regenerator-runtime';

// Para que parcel no recargue la pagina cada vez que guardo algo
/*
if (module.hot) {
  module.hot.accept();
*/

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    // Obtengo del url el hash y procedo a sacarle a este el #
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();

    //1) Cargando recipiente
    await model.loadRecipe(id);

    // 2) Renderizando recipiente
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.log(error);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // 1) Obtengo el query del url
    const query = searchView.getQuery();
    if (!query) return;

    // 2) Obtengo las recetas de la busqueda
    await model.loadSearchResults(query);

    // 3) Renderizo las recetas
    resultsView.render(model.getSearchResultsPage());

    // 4) Renderizo la paginacion
    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// Para actualizar la paginacion tras hacer click a un boton, simplemente llamo a la funcion que renderiza las recetas al pasar de pagina, y a la funcion que renderiza los nuevos botones de paginacion.
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultsPage(goToPage));
  paginationView.render(model.state.search);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};

init();
