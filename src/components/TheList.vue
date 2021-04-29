<template>
  <section class="main">
    <input
      id="toggle-all"
      class="toggle-all"
      type="checkbox"
      v-model="allCompleted"
    />
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li
        :class="[
          'todo',
          { completed: todo.completed },
          { editing: editTodo === todo }
        ]"
        v-for="(todo, index) in showTodos"
        :key="index"
      >
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" />
          <label @dblclick="handleEdit(todo)">{{ todo.title }}</label>
          <button class="destroy" @click="handleRemoveTodo(todo)"></button>
        </div>
        <input
          class="edit"
          type="text"
          v-model="todo.title"
          v-todo-focus="editTodo === todo"
          @blur="handleEditDone(todo)"
          @keyup.enter="handleEditDone(todo)"
          @keyup.esc="handleEditCancel(todo)"
        />
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'TheList',
  data () {
    return {
      beforeEditCache: '',
      editTodo: ''
    }
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    filter () {
      return this.$store.state.filter
    },
    showTodos: function () {
      return this.$store.getters.showTodo
    },
    allCompleted: {
      get: function () {
        return this.todos.every(data => data.completed)
      },
      set: function (value) {
        this.$store.commit('setAllCompleted', value)
      }
    }
  },
  methods: {
    handleEdit: function (todo) {
      this.beforeEditCache = todo.title
      this.editTodo = todo
    },
    handleRemoveTodo: function (todo) {
      var index = this.todos.indexOf(todo)
      this.todos.splice(index, 1)
    },
    handleEditDone: function (todo) {
      if (todo.title.trim()) {
        this.editTodo = null
        this.beforeEditCache = null
      }
    },
    handleEditCancel: function (todo) {
      todo.title = this.beforeEditCache
      this.editTodo = null
      this.beforeEditCache = null
    }
  },
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus()
      }
    }
  }
}
</script>
