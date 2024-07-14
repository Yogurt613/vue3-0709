<script setup>
import { ref } from 'vue'

const aa = ref(false)

// 設一個函數名稱為bb，來更新aa
function bb() {
  console.log('切換按鈕');
  aa.value = !aa.value;
}
</script>

<template>
  <div>
<!-- //aa初始狀態設為false如果aa是true是顯示王曉明 -->
    <div class="container-1" v-if="aa">顯示王曉明</div>
    <div class="container-2" v-else>隱藏王曉明</div>
    
<button @click="bb()">切換</button>
  </div>
</template>

<style scoped>

.container-1 {
  border: 1px solid red;
}

.container-2 {
  border: 1px solid blue;
}
</style>
