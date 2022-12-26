<template>
  <v-card class="rounded-lg mb-4 px-6 py-4">
    <v-row align="center" class="ma-0">
      <!-- Todo content -->
      <v-col cols="12" class="pa-0">
        <h3 :class="{'text-decoration-line-through': isFinished}">{{ title }}</h3>
        <p class="ma-0">{{ description }}</p>
      </v-col>
      <!-- Actions -->
      <v-col cols="12" class="d-flex justify-end pa-0">
        <v-btn color="red darken-1" dark fab small @click="deleteTodo">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <v-btn color="warning darken-1" class="mx-2" dark fab small @click="editTodo">
          <v-icon>mdi-square-edit-outline</v-icon>
        </v-btn>
        <v-btn v-if="!isFinished" color="green darken-1" dark fab small @click="updateIsFinished">
          <v-icon>mdi-check</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true
    },
    description: {
      type: String,
      require: true
    },
    isFinished: {
      type: Boolean,
      require: true
    },
    ind: {
      type: Number,
      require: true
    }
  },
  methods: {
    deleteTodo() {
      this.$store.commit('deleteTodo', this.ind)
    },
    editTodo() {
      this.$store.commit('updateSelectedTodoIndex', this.ind)
      this.$store.commit('editTodo', this.ind)
      this.$store.commit('toggleTodoForm')
    },
    updateIsFinished() {
      this.$store.commit('updateTodoIsFinished', this.ind)
    }
  }
}
</script>

<style></style>
