import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

    const recipe = data.data.recipe;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(`${error} 🧨🧨`);
    // Lanzo el error para que lo pueda atrapar por ejemplo en controlRecipes de controller.js, que es donde se llama a esta funcion
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });
  } catch (error) {
    console.error(`${error} 🧨🧨`);
    throw error;
  }
};

// Aca es donde recibo la cantidad de items que quiero en base a la pagina que quiero ver de items, por ejemplo paso a la paginacion 2, entonces recibo el numero 2 en esta funcion. Y tengo dos variables, la primera le resta uno a page, queda en 1, 1 * 10 (state.search.resultsPerPage), me da 10, despues la otra variable es 2 * 10, 20. Entonces procedo a dar como retorno, los resultados de los ingredientes pero procedo a usar slice para recibir solo desde el item 10 hasta el 19, ya que slice no toma el ultimo item, osea el de 20. Y asi con todos, por ejemplo al primera pagina seria 1, entonces 1 - 1 = 0, 0 * 10 = 0, comienzo en 0, y termino en 1 * 10 = 10, pero recuerdo que el ultimo item no se toma, asi que seria del 0 al 9, como es en base al index, del 0 al 9 tengo 10 items. Serian 10 items por pagina.
export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};
