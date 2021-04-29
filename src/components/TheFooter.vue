<template>
  <footer class="footer" v-show="todos.length">
    <span class="todo-count">
      <strong>{{ todosCount }}</strong> 项目
    </span>
    <ul class="filters">
      <li>
        <router-link
          to="/all"
          :class="{ selected: filter === 'all' }"
          @click="handleChangeFilter('all')"
          >All</router-link
        >
      </li>
      <li>
        <router-link
          to="/active"
          :class="{ selected: filter === 'active' }"
          @click="handleChangeFilter('active')"
          >Active</router-link
        >
      </li>
      <li>
        <router-link
          to="/completed"
          :class="{ selected: filter === 'completed' }"
          @click="handleChangeFilter('completed')"
          >Completed</router-link
        >
      </li>
    </ul>
    <button
      class="clear-completed"
      v-show="hasCompleted"
      @click="handleRemoveAllCompletedTodo"
    >
      删除已完成
    </button>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  created () {
    this.fetchFilter()
  },
  watch: {
    $route: 'fetchFilter'
  },
  computed: {
    todos () {
      return this.$store.state.todos
    },
    filter () {
      return this.$store.state.filter
    },
    todosCount () {
      return this.$store.getters.todosCount
    },
    hasCompleted () {
      return this.$store.getters.hasCompleted
    }
  },
  methods: {
    fetchFilter: function () {
      const filter = this.$route.params.filter
      this.$store.commit('changeFilter', filter)
    },
    handleRemoveAllCompletedTodo: function () {
      this.$store.commit('removeCompleted')
    }
  }
}
</script>
