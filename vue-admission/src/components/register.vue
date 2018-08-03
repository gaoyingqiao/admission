<template>
  <div class="register-container">
    <div class="title-wrap">
      <span class="title-text">注册</span>
    </div>
    <div class="row-wrap">
      <span class="left-text">姓&nbsp;&nbsp;&nbsp;名&nbsp;</span>
      <input v-model="studentInfo.name" class="input-text" type="text" placeholder="请输入姓名">
    </div>
    <div class="row-wrap">
      <span class="left-text">身份证号</span>
      <input v-model="studentInfo.id"  class="input-text" type="text" placeholder="请输入身份证号">
    </div>
    <div class="row-wrap">
      <span class="left-text">手机号码</span>
      <input v-model="studentInfo.phone"  class="input-text" type="text" placeholder="请输入手机号码">
    </div>
    <div class="row-wrap">
      <span class="left-text">意向专业</span>
      <select placeholder="请选择意向专业" v-model="studentInfo.interested" class="select-option">
        <template v-for="profession in professionList">
          <option :label="profession.profession_name" :value="profession.profession_name"></option>
        </template>
      </select>
    </div>
    <div class="row-wrap">
      <span class="left-text">密&nbsp;&nbsp;&nbsp;码&nbsp;</span>
      <input v-model="studentInfo.pass"  class="input-text" type="password" placeholder="请输入密码">
    </div>
    <div class="row-wrap">
      <button class="register-button" @click="register">注册</button>
      <span class="tip-text" @click="jumpToLogin"><u>已有账号？请登录！</u></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return{
        studentInfo: {
          interested: '',
          phone: '',
          id: '',
          name: '',
          pass: ''
        },
        professionList: []
      }
    },
    created() {
      this.requestProfessionList()
    },
    methods: {
      requestProfessionList() {
        this.axios.get('/api/profession').then((response) => {
          console.log('professionList', response)
          if (response.status === 200) {
            this.professionList = response.data.data
          }
        })
      },
      register () {
        this.axios.post('/api/addStudent', this.studentInfo).then((response) => {
          console.log('register', response)
          if (response.status === 200) {
            this.$router.push({name: 'login'})
          }
        })
      },
      jumpToLogin () {
        this.$router.push({name: 'login'})
      }
    }
  }
</script>

<style scoped>
  .register-container {
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
  .select-option {
    width: 320px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #46a1da;
    border-radius: 5px;
    font-size: 16px;
  }
  .register-button {
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
