<template>
  <div class="h-[100vh]">
    <div class="flex flex-wrap md:flex-nowrap h-full">
      <CocktailColumn
        v-for="(cocktail, index) in cocktails"
        :key="index"
        :cocktail="cocktail"
        :isExpanded="expandedColumn === index"
        @click="expandColumn(index)"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import CocktailColumn from './components/CocktailColumn.vue';

export default {
  name: 'App',
  components: {
    CocktailColumn,
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
