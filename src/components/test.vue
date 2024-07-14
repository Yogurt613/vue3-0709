<script>
export default {
/*把數據存在data回傳*/
  data() {
    return {
      count: 0
    }
  },

  /*製作的方法*/
  methods: {
    increment() {
      this.count++
    },
    reduce() {
      if (this.count > 0) { //如果大於0會減1
        this.count--; 
      } else {             //沒有大於0就=0
        this.count = 0;
      }
    },
    reset(){
     this.count =0;
    }
  },

  /*完成組件掛載後要做的事情*/
  //dom的節點已經插入頁面
  mounted() {
    // this.increment();
    console.log('mounted');
  },
  // 組件實例初始化後
  //指數據已經初始化但是dom還沒插入頁面
  created(){
    console.log('created');
  },
  // 組件初始化之前
  
  beforeCreate(){
    console.log('beforeCreate');
  },
  // 組件掛載之前
  //開始渲染會產生虛擬dom再轉成真實dom
  beforeMount(){
    console.log('beforeMount');
  },
  beforeUpdate(){
    console.log('beforeUpdate');
  },
  updated(){
    console.log('updated');
  },
  beforeUnmount(){
    console.log(' beforeUnmount');
  },
  unmounted(){
    console.log('unmounted');
  }
}
</script>

<template>
  <div class="container">
    <button @click="increment" class="btn in">Increment Count</button>
    <button @click="reduce" class="btn red">Reduce Count</button>
    <button @click="reset" class="btn res">reset Count</button>
    <p>Count is: {{ count }}</p>
    <button type="button" @click="increment" class="btn btn-outline-primary">Increment Count</button>
<button type="button" @click="reduce" class="btn btn-outline-secondary">Reduce Count</button>
<button type="button" @click="reset"  class="btn btn-outline-success">reset Count</button>
  </div>
</template>
<style scoped>
/* .container{
  background-color: #F6E6CB;
  border-radius:20px;
  border:2px solid black;
}
.btn{

  margin: 0px 5px;
  border-radius:20px;
}
 .in{
  background-color: #E7D4B5;
  font-weight: bold;

}
.red{
  background-color: #B6C7AA;
  font-weight: bold;
}
.res{
  background-color: #A0937D;
  font-weight: bold;
}
p{
  font-weight: bold;
} */

</style>
