import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todoForm: false,
    todo: {
      title: '',
      description: '',
      isFinished: false
    },
    selectedTodoIndex: null,
    todos: []
  },
  getters: {
  },
  mutations: {
    toggleTodoForm(state) {
      state.todoForm = !state.todoForm
    },
    updateTitle(state, val) {
      state.todo.title = val
    },
    updateDescription(state, val) {
      state.todo.description = val
    },
    updateIsFinished(state, val) {
      state.todo.isFinished = val
    },
    updateTodoIsFinished(state, ind) {
      state.todos = state.todos.map((todo,i) => {
        if(i === ind) {
          todo.isFinished = !todo.isFinished 
        }
        return todo
    })
    },
    addTodo(state, todo) {
      state.todos = [ ...state.todos, todo ]
    },
    deleteTodo(state, ind) {
      state.todos.splice(ind, 1)
    },
    editTodo(state, ind) {
      const { title, description, isFinished } = state.todos[ind]
      state.todo.title = title
      state.todo.description = description
      state.todo.isFinished = isFinished
    },
    updateSelectedTodoIndex(state, ind) {
      state.selectedTodoIndex = ind
    },
    updateTodo(state, { todo, ind }) {
      state.todos[ind] = todo
    },
    updateTodos(state, todosArr) {
      state.todos = todosArr
    }
  },
  actions: {
  },
  modules: {
  }
})
