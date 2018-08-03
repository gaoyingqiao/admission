<template>
  <div class="login-container">
    <div class="title-wrap">
      <span class="title-text">登录</span>
    </div>
    <div class="row-wrap">
      <span class="left-text">手机号码</span>
      <input v-model="info.phone" class="input-text" type="text" placeholder="请输入手机号码">
    </div>
    <div class="row-wrap">
      <span class="left-text">密&nbsp;&nbsp;&nbsp;码&nbsp;</span>
      <input v-model="info.pass" class="input-text" type="password" placeholder="请输入密码">
    </div>
    <div class="row-wrap">
      <button class="login-button" @click="login">登录</button>
      <span class="tip-text" @click="jumpToRegister"><u>暂无账号？请注册！</u></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        info: {
          pass: '',
          phone: ''
        }
      }
    },
    methods: {
      login () {
        let pattern = /^[1][3,4,5,7,8][0-9]{9}$/
        if (!pattern.test(this.info.phone)) {
          return false;
        }
        this.axios.post('/api/studentLogin', this.info).then((response) => {
          console.log('login', response)
          if (response.status === 200) {
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('id', response.data.data._id)
            this.$router.push({name: 'userDetail', params: {id: response.data.data._id}})
          }
        })
      },
      jumpToRegister () {
        this.$router.push({name: 'register'})
      }
    }
  }
</script>

<style scoped>
  .login-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .title-wrap {
    margin-top: 40px;
    margin-bottom: 40px;
    color: #666;
    font-size: 20px;
  }
  .title-wrap::before {
    content: '';
    width: 120px;
    height: 2px;
    vertical-align: middle;
    display: inline-block;
    background-color: #46a1da;
  }
  .title-wrap::after {
    content: '';
    width: 120px;
    height: 2px;
    vertical-align: middle;
    display: inline-block;
    background-color: #46a1da;
  }
  .title-text {
    padding: 0 20px;
  }
  .row-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }
  .left-text {
    display: inline-block;
    width: 90px;
    padding-right: 20px;
    text-align: right;
    font-size: 20px;
  }
  .input-text {
    width: 300px;
    border: 1px solid #46a1da;
    border-radius: 5px;
    font-size: 16px;
    padding: 5px 10px;
  }
  .login-button {
    width: 120px;
    background-color: #46a1da;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #ffffff;
    padding: 5px 10px;
    margin-right: 10px;
    cursor: pointer;
  }
  .tip-text {
    display: inline-block;
    color: #46a1da;
    font-size: 14px;
    cursor: pointer;
  }
</style>
