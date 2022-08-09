import * as model from './model.js';
import recipeView from './views/recipeView.js';
import { render } from 'sass';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
///////////////////////////////////////

const controllerRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);
    if (!id) return;

    recipeView.renderSpinner();

    //1-Load the recipe
    await model.loadRecipe(id);
    //2 rendering recipe

    recipeView.render(model.state.recipe);
  } catch (e) {
    console.log(e);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controllerRecipes)
);
//The hashchange event is fired when the fragment identifier of the URL has changed (the part of the URL beginning with and following the # symbol)
