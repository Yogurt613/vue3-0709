<template>
  <div id="app" class="container mt-4">
    <!-- 標籤頁結構 -->
    <div class="tabs">
      <!-- Tab 1: 註冊會員 -->
      <input type="radio" class="tabs__radio" name="tabs-example" id="tab1" checked>
      <label for="tab1" class="tabs__label">註冊會員</label>
      <div class="tabs__content">
        <!-- 註冊表單 -->
        <el-form ref="form" :model="form" label-width="80px">
          <!-- 用戶名輸入框 -->
          <el-form-item label="用戶名">
            <el-input v-model="form.name" required></el-input>
          </el-form-item>
          <!-- 電郵輸入框 -->
          <el-form-item label="電郵">
            <el-input v-model="form.mail" required type="email" placeholder="example@example.com"></el-input>
          </el-form-item>
          <!-- 手機輸入框 -->
          <el-form-item label="手機">
            <el-input v-model="form.phone" required type="tel" placeholder="123-456-7890"></el-input>
          </el-form-item>
          <!-- 密碼輸入框 -->
          <el-form-item label="密碼">
            <el-input type="password" v-model="form.password" required></el-input>
          </el-form-item>
          <!-- 生日日期選擇器 -->
          <el-form-item label="生日日期">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="選擇日期" v-model="form.date1" style="width: 100%;"
                required></el-date-picker>
            </el-col>
          </el-form-item>
          <!-- 提交和取消按鈕 -->
          <el-form-item>
            <el-button type="primary" @click="onRegister">加入會員</el-button>
            <el-button type="default" @click="clearForm">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- Tab 2: 會員登入 -->
      <input type="radio" class="tabs__radio" name="tabs-example" id="tab2">
      <label for="tab2" class="tabs__label">會員登入</label>
      <div class="tabs__content">
        <!-- 登入表單 -->
        <el-form ref="loginForm" :model="loginForm" label-width="80px">
          <!-- 電郵輸入框 -->
          <el-form-item label="電郵">
            <el-input v-model="loginForm.mail" required type="email" placeholder="example@example.com"></el-input>
          </el-form-item>
          <!-- 密碼輸入框 -->
          <el-form-item label="密碼">
            <el-input type="password" v-model="loginForm.password" required></el-input>
          </el-form-item>
          <!-- 登入和忘記密碼按鈕 -->
          <el-form-item>
            <el-button type="primary" @click="onLogin">登入</el-button>
            <el-button type="text" @click="onForgotPassword">忘記密碼?</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 註冊表單數據
      form: {
        name: '',          // 用戶名
        mail: '',          // 電郵
        phone: '',         // 手機
        password: '',      // 密碼
        date1: ''          // 生日日期
      },
      // 登入表單數據
      loginForm: {
        mail: '',          // 電郵
        password: ''       // 密碼
      },
      users: []   // 存儲用戶數據的資訊
    };
  },
  methods: {
    // 註冊用戶
    onRegister() {
      // 檢查所有必填項目是否已填寫
      if (this.form.name && this.form.mail && this.form.phone && this.form.password && this.form.date1) {
        // 將表單數據添加到 users 列表中
        this.users.push({
          name: this.form.name,
          mail: this.form.mail,
          phone: this.form.phone,
          password: this.form.password,
          date1: this.form.date1
        });

        // 更新 localStorage
        localStorage.setItem('users', JSON.stringify(this.users));

        // 顯示註冊成功提示
        alert('註冊成功');

        // 清空表單
        this.clearForm();
      } else {
 
        alert('請填寫所有必填項目');
      }
    },
    // 登入用戶
    onLogin() {
      // 從 localStorage 獲取用戶數據
      const users = JSON.parse(localStorage.getItem('users'));

      // 確保用戶數據存在
      if (users) {
        // 查找符合登入信息的用戶
        const foundUser = this.users.find(member =>
          member.mail === this.loginForm.mail && member.password === this.loginForm.password  //使用者的信箱和密碼 是否等於系統上的信箱和密碼
        );


        if (foundUser) {
          // 登入成功
          alert('登入成功');

        } else {
          // 登入失敗
          alert('登入失敗，請檢查您的電郵和密碼');
        }
      } else {
        // 如果 localStorage 中沒有用戶數據
        alert('沒有找到用戶數據');
      }
    },
    // 清空註冊表單
    clearForm() {
      this.form.name = '';
      this.form.mail = '';
      this.form.phone = '';
      this.form.password = '';
      this.form.date1 = '';
    },
    // 忘記密碼處理
    onForgotPassword() {
      // 可以在這裡添加忘記密碼處理邏輯
      alert('忘記密碼?');
    }
  },
  created() {
    // 獲取 localStorage 中的 'users' 鍵的數據
    let storedUsers = localStorage.getItem('users');

    // 檢查 storedUsers 是否有值
    if (!storedUsers) {
      // 如果 storedUsers 為空，則創建一組預設的用戶數據
      const defaultUsers = [
        { name: 'Alice', mail: 'alice@example.com', phone: '123-456-7890', password: 'password123', date1: '2000-01-01' },
        { name: 'Bob', mail: 'bob@example.com', phone: '098-765-4321', password: 'password456', date1: '1990-12-31' }
      ];

      // 將預設的用戶數據轉換成 JSON 字符串，並存儲到 localStorage 中，鍵名為 'users'
      localStorage.setItem('users', JSON.stringify(defaultUsers));

      // 將 storedUsers 設置為預設用戶數據，因為 localStorage 中原本沒有數據
      storedUsers = defaultUsers;
    } else {
      // 如果 localStorage 中有數據，則將 JSON 字符串轉換成 JavaScript 對象
      storedUsers = JSON.parse(storedUsers);
    }

    // 將用戶數據設置到 Vue 組件的 users 屬性中，這樣組件就可以使用這些數據了
    this.users = storedUsers;
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tabs {
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  font-family: sans-serif;
}

.tabs__label {
  padding: 10px 16px;
  cursor: pointer;
}

.tabs__radio {
  display: none;
}

.tabs__content {
  order: 1;
  width: 100%;
  border-bottom: 3px solid #dddddd;
  line-height: 1.5;
  font-size: 0.9em;
  display: none;
}

.tabs__radio:checked+.tabs__label {
  font-weight: bold;
  color: #009578;
  border-bottom: 2px solid #009578;
}

.tabs__radio:checked+.tabs__label+.tabs__content {
  display: initial;
}
</style>
