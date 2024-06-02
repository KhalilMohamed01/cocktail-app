<template>
  <div >
    <div class="flex h-screen">
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
.container {
  width: 100%;
  height: 100%;
}
</style>
