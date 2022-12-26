<template>
  <v-dialog :value="true" :width="width" persistent>
    <v-card class="rounded-lg">
      <v-card-title class="text-h5 text-capitalize primary white--text">{{ isEdit? 'edit':'create new' }} todo</v-card-title>
      <v-form ref="form" v-model="valid" class="px-6 pt-6 pb-2" lazy-validation>
        <v-text-field v-model="title" :rules="titleRules" required solo placeholder="Title" @keypress.enter="submitForm" />
        <v-text-field v-model="desc" required solo placeholder="Description" @keypress.enter="submitForm" />
        <v-checkbox v-model="isFinished" label="Is Completed" class="mt-0" />
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error darken-1" dark @click="cancel">cancel</v-btn>
          <v-btn color="green darken-1" dark @click="submitForm">{{ isEdit? 'save':'create' }}</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      valid: false,
      isEdit: false,
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length >= 3) || 'Title must be more than 3 characters',
      ],
    }
  },
  computed: {
    ...mapState(['todoForm', 'todo', 'selectedTodoIndex']),
    title: {
      get() {
        return this.todo.title
      },
      set(val) {
        this.$store.commit('updateTitle', val)
      }
    },
    desc: {
      get() {
        return this.todo.description
      },
      set(val) {
        this.$store.commit('updateDescription', val)
      }
    },
    isFinished: {
      get() {
        return this.todo.isFinished
      },
      set(val) {
        this.$store.commit('updateIsFinished', val)
      }
    },
    width() {
      let width = ''
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          width = '100vw'
          break;
        case 'sm':
          width = '84vw'
          break;
        case 'md':
          width = '67vw'
          break;
        case 'lg':
          width = '50vw'
          break;
        case 'xl':
          width = '40vw'
          break;
      }
      return width
    }
  },
  mounted() {
    if(this.selectedTodoIndex !== null) this.isEdit = true
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    async submitForm() {
      await this.$refs.form.validate()
      if(this.valid) {
        const todo = { title: this.title, description: this.desc, isFinished: this.isFinished }
        this.isEdit ? this.$store.commit('updateTodo', { todo, ind: this.selectedTodoIndex }) : this.$store.commit('addTodo', todo)
        this.reset()
        this.toggleTodoForm()
      }
    },
    cancel() {
      this.toggleTodoForm()
    },
    toggleTodoForm() {
      this.$store.commit('toggleTodoForm')
    }
  },
  beforeDestroy() {
    this.$store.commit('updateSelectedTodoIndex', null)
  },
}
</script>
