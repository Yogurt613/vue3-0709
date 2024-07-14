<script setup>
import { ref } from 'vue'

// 用 ref 引用 txt
const txt = ref("123")
</script>

<template>
    <div>
        <input type="text" v-model="txt">
        <p>{{ txt }}</p>
    </div>
</template>

<style scoped>

</style>
