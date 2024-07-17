<!----
1.先把畫面做出來 輸入框用v-model 輸入完按enter 要設定@keyup.enter
2.按紐新增用@click
3.接著設定 全部,進行中,已完成這三個動態:class="{active:fliter ==='all'}"
 用fliter 篩選
 4.篩選完接這抓資料用v-for :key="index"
 5.checkbox 用v-model 如果是打勾顯示已完成並且劃掉
 完成的項目會顯示標題
 6.移除的項目用@click 並且傳遞參數，用索引位置，來辨識哪個項目被點擊。
-->
<template>
  <div id="app" class="container mt-4">
    <div class="header">
      <h2><span>待辦</span>事項</h2>
    </div>
    <!-- 新增事件 -->
    <div class="addList">
      <div class="col-auto p-0">
        <div class="input-group mb-2">
          <div class="input-group-prepend">



          </div>
          <input type="text" class="form-control event" placeholder="輸入待辦事項..." v-model="newTodo" @keyup.enter="addTodo">
          <button type="button" class="btn btn-outline-primary" @click="addTodo">新增</button>
        </div>
      </div>
    </div>
    <!-- 篩選選項 -->
    <div class="filter-options mb-3">
      <button class="btn btn-outline-primary" :class="{ active: filter === 'all' }"
        @click="setFilter('all')">全部</button>
      <button class="btn btn-outline-primary" :class="{ active: filter === 'active' }"
        @click="setFilter('active')">進行中</button>
      <button class="btn btn-outline-primary" :class="{ active: filter === 'completed' }"
        @click="setFilter('completed')">已完成</button>
    </div>
    <!-- 事件列表 -->
    <ul class="listTo">
      <li v-for="(todo, index) in filteredTodos" :key="index">
        <div>
          <input type="checkbox" v-model="todo.completed">
          <span :class="{ completed: todo.completed }">{{ todo.content }}</span>
        </div>
        <i class="fas fa-trash-alt" @click="removeTodo(index)"></i>
        
      </li>
    </ul>
  </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
export default {
  data() {
    return {
      newTodo: '',
      todos: [],
      filter: 'all'
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos;
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      }
      return this.todos;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === '') return;
      this.todos.push({ content: this.newTodo, completed: false });
      this.newTodo = '';
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    setFilter(filter) {
      this.filter = filter;
    }
  }
};
</script>

<style>
#app {
  max-width: 600px;
  margin: auto;
}

.header {
  text-align: center;
}

.addList .btn-addNew {
  background-color: #007bff;
  color: white;
}

.filter-options .btn {
  margin-right: 5px;
}

.filter-options .btn.active {
  background-color: #007bff;
  color: white;
}

.listTo {
  list-style: none;
  padding: 0;
}

.listTo li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.listTo li .completed {
  text-decoration: line-through;
}
</style>
