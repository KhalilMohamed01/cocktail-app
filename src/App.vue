<template>
  <div class="container mx-auto">
    <h1 class="text-4xl text-center mt-10 mb-5">Random Cocktails</h1>
    <button @click="fetchCocktails" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-5">Refresh Cocktails</button>
    <div class="flex flex-wrap justify-center">
      <CocktailCard v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail" />
    </div>
  </div>
</template>

<script>
import CocktailCard from './components/CocktailCard.vue';

export default {
  name: 'App',
  components: {
    CocktailCard
  },
  data() {
    return {
      cocktails: []
    }
  },
  methods: {
    async fetchCocktails() {
      this.cocktails = [];
      for (let i = 0; i < 3; i++) {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
        const data = await response.json();
        this.cocktails.push(data.drinks[0]);
      }
    }
  },
  mounted() {
    this.fetchCocktails();
  }
}
</script>

<style scoped>
</style>
