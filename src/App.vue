<template>
  <div id="app">
    <section class="todoapp" v-cloak>
      <the-header @add-todo="handleAddTodo"></the-header>
      <the-list :todos.sync="todos" :filter="filter"></the-list>
      <the-footer :todos.sync="todos" :filter.sync="filter"></the-footer>
    </section>
  </div>
</template>

<script>
import '@/assets/todos-html/base.css'
import '@/assets/todos-html/index.css'
import TheHeader from '@/components/TheHeader'
import TheList from '@/components/TheList'
import TheFooter from '@/components/TheFooter'
export default {
  computed: {
    todos () {
      return this.$store.state.todos
    },
    filter () {
      return this.$store.state.filter
    }
  },
  methods: {
    // handleChangeFilter (filter) {
    //   this.filter = filter
    // },
    handleAddTodo (todo) {
      this.todos.push(todo)
    }
  },
  components: {
    'the-header': TheHeader,
    'the-list': TheList,
    'the-footer': TheFooter
  }
}
</script>
