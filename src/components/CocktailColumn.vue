<template>
  <div
    :class="[
      'flex flex-col transition-all duration-500',
      'slide-in',
      isExpanded ? 'flex-grow w-full md:w-11/12' : 'items-center w-full md:w-1/12 cursor-pointer hover:bg-[#f1d49e81]',
      columnColor
    ]"
    @click="$emit('click')"
    :style="{ animationDelay: `${index * 0.5}s` }"
  >
    <div v-if="isExpanded" class="mt-2 ml-4 text-[#989A8C]">
      <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 font-title font-bold mr-4 mb-2" :style="{ fontSize: '4vw' }">
        <span class="text-center">{{ columnNumber }}</span>
      </div>
      <div class="flex flex-col md:flex-row p-4 md:p-8 items-center">
        <img :src="cocktail.strDrinkThumb" alt="Cocktail Image" class="w-full md:w-1/3 aspect-square mb-2 rounded-lg" />
        <div class="pl-0 md:pl-8">
          <span class="font-title font-bold" :style="{ fontSize: '5vw' }">{{ cocktail.strDrink }}</span>
          <p id="category" class="mb-4">
            <font-awesome-icon :icon="['fas', 'champagne-glasses']" />
            &nbsp;&nbsp;<span>{{ cocktail.strCategory }}</span>
          </p>
          <p class="text-md md:text-xl text-[#666666] max-w-screen-md mb-4">
            {{ cocktail.strInstructions }}
          </p>
          <div class="mb-4">
            <table class="table-auto w-full text-left text-[#989A8C]">
              <thead>
                <tr>
                  <th class="px-4 py-2">Ingredient</th>
                  <th class="px-4 py-2">Measure</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(ingredient, index) in ingredients" :key="index">
                  <td class="border border-[#989A8C] text-gray-700 px-4 py-2">{{ ingredient.name }}</td>
                  <td class="border border-[#989A8C] text-gray-700 px-4 py-2">{{ ingredient.measure }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p id="glass" class="mb-4">
            <font-awesome-icon :icon="['fas', 'martini-glass']" />
            {{ cocktail.strGlass }}
          </p>
        </div>
      </div>
    </div>
    <div v-else id="non-expanded" class="mt-2 h-full flex items-start font-title font-bold text-[#989A8C] number-animation" :style="{ fontSize: '4vw' }">
      <span class="text-center">{{ columnNumber }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CocktailColumn',
  props: {
    cocktail: Object,
    isExpanded: Boolean,
    index: Number,
  },
  computed: {
    ingredients() {
      const ingredients = [];
      for (let i = 1; i <= 15; i++) {
        const ingredient = this.cocktail[`strIngredient${i}`];
        const measure = this.cocktail[`strMeasure${i}`];
        if (ingredient) {
          ingredients.push({ name: ingredient, measure: measure || '' });
        }
      }
      return ingredients;
    },
    columnNumber() {
      return `0${this.index + 1}`;
    },
    columnColor() {
      const colors = ['bg-color1', 'bg-color2', 'bg-color3'];
      return colors[this.index % colors.length];
    },
  },
};
</script>

<style scoped>
.flex-grow {
  flex-grow: 1;
}
.bg-color1 {
  background-color: #FDFCF8;
}
.bg-color2 {
  background-color: #F6F3EA;
}
.bg-color3 {
  background-color: #F0ECE0;
}
.number-animation {
  transition: transform 0.3s ease-in-out;
}
.number-animation:hover {
  transform: translateY(-5px);
}
.slide-in {
  opacity: 0;
  transform: translateX(100%);
  animation: slide-in 0.5s forwards;
}
@keyframes slide-in {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
