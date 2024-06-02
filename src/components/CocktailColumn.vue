<template>
    <div
      :class="[
        'flex flex-col transition-all duration-500',
        isExpanded ? 'flex-grow w-11/12' : 'items-center w-1/12',
        columnColor
      ]"
      @click="$emit('click')"
    >
      <div v-if="isExpanded" class="h-[90vh] mt-2 ml-4 text-[#989A8C] font-title">
        <div class=" flex space-x-16 text-7xl font-bold mr-4 mb-2">
        <span >{{ columnNumber }}</span>
        <span >{{ cocktail.strDrink }}</span>
        </div>
        <div class="flex p-8 items-center h-full">
          <img :src="cocktail.strDrinkThumb" alt="Cocktail Image" class="w-1/3 aspect-square mb-2 rounded-lg" />
          <div class="pl-8">
            <p class="mb-4">
              <font-awesome-icon :icon="['fas', 'champagne-glasses']" />
              &nbsp;&nbsp;<span>{{ cocktail.strCategory }}</span>
            </p>
            <p class="text-xl text-[#666666] max-w-screen-md mb-4">
              {{ cocktail.strInstructions }}
            </p>
            <div class="mb-4">
              <table class="table-auto w-full text-left  text-[#989A8C]">
                <thead>
                  <tr>
                    <th class="px-4 py-2">Ingredient</th>
                    <th class="px-4 py-2">Measure</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ingredient, index) in ingredients" :key="index">
                    <td class="border  border-[#989A8C] text-gray-700 px-4 py-2">{{ ingredient.name }}</td>
                    <td class="border border-[#989A8C] text-gray-700 px-4 py-2">{{ ingredient.measure }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="mb-4">
              <font-awesome-icon :icon="['fas', 'martini-glass']" />
              {{ cocktail.strGlass }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="text-7xl mt-2 font-bold text-[#989A8C]">
        {{ columnNumber }}
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CocktailColumn',
    props: {
      cocktail: Object,
      isExpanded: Boolean,
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
        return `0${this.$parent.cocktails.indexOf(this.cocktail) + 1}`;
      },
      columnColor() {
        const index = this.$parent.cocktails.indexOf(this.cocktail);
        const colors = ['bg-color1', 'bg-color2', 'bg-color3'];
        return colors[index % colors.length];
      }
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
  </style>
  