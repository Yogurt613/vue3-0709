<script setup>
import { ref } from 'vue'


const aa = ref(false)  //引用ref括號裡面塞我們要的資料塞參數假設畫面一開始是關的那麼這裡放false

function bb(){
  aa.value = !aa.value;
}
</script>

<template>
  <div>
     <!-- //把開關命名為aa如果是true顯示on -->
    <!-- <button @click="aa= true">ON</button>  -->
    <!-- <button @click="aa= false">OFF</button> -->
    <button @click="bb()">ON</button> 

    <p v-show="aa">王曉明</p>
  </div>
</template>

<style scoped>

</style>
