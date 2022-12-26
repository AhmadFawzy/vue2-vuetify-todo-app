<template>
  <v-app>
    <AppHeader />
    <v-main class="grey lighten-3">
      <TodoList class="mt-16" />
    </v-main>
  </v-app>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import TodoList from '@/components/todo/TodoList.vue'
export default {
  name: 'App',
  components: { AppHeader, TodoList }
}
</script>

<style>
html {
  overflow: auto;
}
</style>