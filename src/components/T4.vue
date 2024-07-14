<script>
export default {
  // data() 返回的屬性將會成為響應式的狀態
  // 並且暴露在 `this` 上
  data() {
    return {
      count: 0
    }
  },

  // methods 是一些用來更改狀態與觸發更新的函數
  // 它們可以在模板中作為事件處理器綁定
  methods: {
    increment() {
      this.count++
    }
  },

  // 生命週期鉤子會在組件生命週期的各個不同階段被調用
  // 例如這個函數就會在組件掛載完成後被調用
  mounted() {
    console.log(`The initial count is ${this.count}.`)
  }
}
</script>

<template>
  <button @click="increment">Count is: {{ count }}</button>
</template>