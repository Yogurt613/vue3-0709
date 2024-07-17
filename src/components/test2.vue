<!--建立一個簡單的待辦事項清單應用程式：
1. 新增、刪除待辦事項
新增使用v-model刪除用v-on 綁定事件
新增待辦事項：於input欄位輸入後通過按下“新增”按鈕或Enter鍵來添加新的待辦事項。
刪除待辦事項：通過點擊“刪除”按鈕來移除指定的待辦事項
2. 標記已完成的事項
設一個checkbox去做標記 若已完成會用checkbox呈現勾勾狀態並且劃掉
3. 使用 v-for 和 v-if 指令來渲染清單和篩選未完成/已完成事項
使用v-for把每個項目生成出來 每個項目清單後面放置一個checkbox用來標記已完成未完成 用v-if 去做切換只顯示未完成 另一個地方只顯示已完成
4. 使用 computed 屬性來計算未完成事項的數量-->
<template>
    <div id="app">

        <h2>Todo List</h2>
        <li v-for="number in numbers" :key="number">{{ number }}</li>
        <!-- <form> -->
        <div class="input-group">
            <input v-model="newTodo" @keyup.enter="addtodo" type="text" class="form-control" placeholder="請輸入代辦事項">
            <button type="submit" class="btn-primary" @click="addtodo">新增</button>
        </div>
        <!--透過v-for 從todos抓單筆資料給item (每一筆都會跑到)-->
        <ul>
            <li v-for="item in todos" :key="item.id">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" v-model="item.completed">
                  <label class="form-check-label" >{{item.id +'-'+item.title}}</label>  
                <button type="button" class="btn btn-success btn-sm" v-if="item.completed " >已完成事項</button>
                <button type="button" class="btn btn-warning btn-sm" v-else>未完成事項</button>
                <button type="button" class="btn btn-danger btn-sm" @click="removetodo(item.id)" >刪除</button>
                </div>
            </li>
        </ul>
    </div>

    <!-- </form> -->

</template>

<script>
export default {
    data() {
        return {
            todos: [
                { id: 1, title: '學習 Vue.js', completed: false },
                { id: 2, title: '完成專案', completed: true }
            ],
            newTodo:''
        }
    },
    methods: {
        addtodo(){
            if(this.newTodo.trim() === '') return;
            this.todos.push({
                id: this.todos.length+1,
                title: this.newTodo,
                completed: false
            });
            this.newTodo = '';
        },
        removetodo(id){
            //移除所選id物件//fliter塞選要的資料,塞選不是不要的資料,
            this.todos = this.todos.filter(todo => todo.id != id);
        }
    }

}
</script>

<style scoped>
.form-check .btn{
    margin-left: 25px;
}
</style>