<template>
    <button @click="increment" class="btn">Count is: {{ count }}</button>
  </template>
  
  <script>
  export default {
    data() {
      return {
        count: 0
      };
    },
    methods: {
      increment() {
        this.count++;
      }
    }
  };
  </script>
  
  <style scoped>
  .btn {
    background-color: #F1E5D1;
   font-weight: bold;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    border-radius: 20px;
    font-size: 25px;
  }
  
  .btn:hover {
    background-color: #DBB5B5;
  }
  </style>
  