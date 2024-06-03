<template>
  <div class="h-[100vh] relative">
    <div class="flex flex-wrap md:flex-nowrap h-full">
      <CocktailColumn
        v-for="(cocktail, index) in cocktails"
        :key="index"
        :cocktail="cocktail"
        :isExpanded="expandedColumn === index"
        :index="index"
        @click="expandColumn(index)"
      />
    </div>
    <button
      @click="fetchCocktails"
      class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-900 cursor-pointer hover:bg-yellow-800 text-white p-4 rounded-full shadow-lg flex items-center"
    >
      <font-awesome-icon :icon="['fas', 'dice']" class="mr-2" />
      Refresh Cocktails
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import CocktailColumn from './components/CocktailColumn.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faDice);

export default {
  name: 'App',
  components: {
    CocktailColumn,
    'font-awesome-icon': FontAwesomeIcon,
  },
  data() {
    return {
      cocktails: [],
      expandedColumn: 0,
    };
  },
  methods: {
    expandColumn(index) {
      this.expandedColumn = index;
    },
    async fetchCocktails() {
      try {
        const promises = Array(3)
          .fill(null)
          .map(() => axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php'));
        const responses = await Promise.all(promises);
        this.cocktails = responses.map(response => response.data.drinks[0]);
      } catch (error) {
        console.error('Error fetching cocktails:', error);
      }
    },
  },
  created() {
    this.fetchCocktails();
  },
};
</script>

<style>
.h-full {
  height: 100%;
}
</style>
