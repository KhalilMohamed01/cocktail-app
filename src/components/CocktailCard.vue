<template>
    <div class="max-w-sm rounded overflow-hidden shadow-lg m-4">
      <img :src="cocktail.strDrinkThumb" alt="Cocktail" class="w-full">
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ cocktail.strDrink }}</div>
        <p class="text-gray-700 text-base">
          {{ cocktail.strInstructions }}
        </p>
      </div>
      <div class="px-6 pt-4 pb-2">
        <span v-for="(ingredient, index) in ingredients" :key="index" class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {{ ingredient }}
        </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CocktailCard',
    props: {
      cocktail: {
        type: Object,
        required: true
      }
    },
    computed: {
      ingredients() {
        return Object.keys(this.cocktail)
          .filter(key => key.startsWith('strIngredient') && this.cocktail[key])
          .map(key => this.cocktail[key]);
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  