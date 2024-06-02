<template>
  <div class="w-full">
    <NavBar @refresh-cocktails="fetchCocktails"/>
   
    <div class="flex flex-wrap justify-center">
      <CocktailCard v-for="(cocktail, index) in cocktails" :key="index" :cocktail="cocktail" />
    </div>
  </div>
</template>

<script>
import CocktailCard from './components/CocktailCard.vue';
import NavBar from './components/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
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
