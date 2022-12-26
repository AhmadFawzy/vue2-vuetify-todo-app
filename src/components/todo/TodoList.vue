<template>
  <v-row class="ma-0" justify="center">
    <v-col sm="10" md="8" lg="6" class="d-flex justify-center flex-column pa-0">
      <v-btn class="rounded-lg text-capitalize primary py-6 px-0 mb-6" block @click="createTodo">create new todo</v-btn>
      <TodoForm v-if="todoForm" />
      <template v-if="todos?.length">
        <TodoItem
          v-for="({ title, description, isFinished }, ind) in todos"
          :key="ind"
          :title="title"
          :description="description"
          :isFinished="isFinished"
          :ind="ind"
        />
      </template>
      <v-card v-else class="rounded-lg pa-4">
        <p class="ma-0">no todos yet</p>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
import TodoForm from '@/components/todo/TodoForm.vue'
import TodoItem from '@/components/todo/TodoItem.vue'
export default {
  components: { TodoForm, TodoItem },
  computed: {
    ...mapState([ 'todos', 'todoForm' ])
  },
  mounted() {
    const todos =  JSON.parse(localStorage.getItem('todos'))
    if(todos) this.$store.commit('updateTodos', todos)
  },
  methods: {
    createTodo() {
      this.$store.commit('updateTitle', '')
      this.$store.commit('updateDescription', '')
      this.$store.commit('updateIsFinished', false)
      this.$store.commit('toggleTodoForm')
    }
  },
  watch: {
    todos: {
      handler(arr) {
        if(arr) localStorage.setItem('todos', JSON.stringify(arr))
      },
      deep: true
    }
  }
}
</script>

<style></style>