<template>
    <nav class="flex justify-end">
        <div class="bg-gray-800 px-4 py-6 text-white cursor-pointer" @click="refreshCocktails">
          <font-awesome-icon :icon="['fas', 'search']" class="text-white mr-2" />
          Refresh Cocktails
        </div>
    </nav>
</template>

<script>
export default {
  methods: {
    refreshCocktails() {
      this.$emit('refresh-cocktails');
    }
  }
}
</script>

<style scoped>
</style>
