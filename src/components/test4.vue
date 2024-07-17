<!--
 1.先建一個div區塊,建一個button開始遊戲
 用p段落輸入猜一個1到1000之間的數字：
 輸入框用input type="number" class="form-control mb-3" min="1" max="1000" />
 提交用button用
 2.用v-if設定"!gameStarted"只有在遊戲還沒開始（gamestart 為 false）時才顯示。
3.接著點擊button開始遊戲 用@click="startGame"
4.接著再輸入框輸入要猜的數字 用v-model綁定輸入框的值和猜的值
5.點擊button @click="submit" 提交
6.如果猜的數字太小或太大用reply回覆 給相對應的提示
7.如果顯示恭喜你完成挑戰！總挑戰次數 用v-if"completeChallenge" 總挑戰次數用:Totaltimes 
------------
data: 先隨機產生秘密數字,用戶猜測的數字,回復,遊戲是否已經開始,遊戲是否結束,用戶的猜測次數。
方法:(1)遊戲開始(2)產生亂數(3)用戶開始猜測顯示回復

      
  --->

<template>
  <div id="app" class="container mt-4">
    <div class="card text-center">
      <div class="card-body">
        <div v-if="!gameStarted">
          <button class="btn btn-primary" @click="startGame">開始遊戲</button>
        </div>
        <div v-else>
          <p class="card-text">猜一個1到1000之間的數字：</p>
          <input type="number" v-model.number="guess" @keyup.enter="submit" class="form-control mb-3" min="1" max="1000" />
          <button class="btn btn-primary" @click="submit">提交</button>
          <p class="mt-3" v-if="reply">{{ reply }}</p>
          <p class="mt-3" v-if="completeChallenge">恭喜你完成挑戰！總挑戰次數：{{ totalTimes }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gameStarted: false,
      secretNumber: 0,
      guess: 0,
      reply: '',
      completeChallenge: false,
      totalTimes: 0
    };
  },
  methods: {
    startGame() {
      this.gameStarted = true;
      this.secretNumber = this.generateRandomNumber();
    },
    generateRandomNumber() {
      return Math.floor(Math.random() * 1000) + 1;
    },
    submit() {
      this.totalTimes++;
      if (this.guess === this.secretNumber) {
        this.reply = '恭喜你猜對了！';
        this.completeChallenge = true;
      } else if (this.guess > this.secretNumber) {
        this.reply = '猜太大了，再猜小一點。';
      } else if (this.guess < this.secretNumber) {
        this.reply = '猜太小了，再猜大一點。';
      }
    }
  }
};
</script>

<style>
#app {
  text-align: center;
}
</style>
