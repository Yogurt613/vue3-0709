import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-plus/dist/index.css' // 確保導入 Element Plus 的樣式
import ElementPlus from 'element-plus'

// 創建 Vue 應用實例
const app = createApp(App)

// 使用 Element Plus 插件
app.use(ElementPlus)

// 挂載應用
app.mount('#app')
