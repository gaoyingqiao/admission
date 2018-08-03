<template>
  <div class="detail-container">
    <div class="title-wrap">
      <span class="title-text">学生基本信息</span>
    </div>
    <div class="info-wrap">
      <div class="info-row">
        <span>姓名：</span>{{this.studentInfo.student_name}}
      </div>
      <div class="info-row">
        <span>身份证号：</span>{{this.studentInfo.student_id}}
      </div>
      <div class="info-row">
        <span>手机号码：</span>{{this.studentInfo.student_phone}}
      </div>
      <div class="info-row">
        <span>意向专业：</span>{{this.studentInfo.student_interested}}
      </div>
      <div class="info-row">
        <span>是否录取：</span>{{this.isAdmitted()}}
      </div>

      <input v-model="question"  class="input-text" type="text" placeholder="问题">
      <button type="button" @click="createInfo">提交</button>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        studentInfo: {},
        answer: '',
        question: '',
      }
    },
    created() {
      this.requestDetailInfo()
    },
    methods: {
      requestDetailInfo () {
        let id = sessionStorage.getItem('id')
        this.axios.get(`/api/student/${id}`).then((response) => {
          console.log('requestDetailInfo', response)
          if (response.status === 200) {
            this.studentInfo = response.data.data
          }
        })
      },
      isAdmitted() {
        if (this.studentInfo.student_isAdmitted === '0') {
          return '审核中'
        } else if (this.studentInfo.student_isAdmitted === '1') {
          return '已录取'
        } else {
          return '未录取'
        }
      },
      createInfo () {
        this.axios.post('/api/modifyStudent', {
          id: this.studentInfo._id,
          phone: this.studentInfo.student_phone,
          answer: this.answer,
          question: this.question,
        }).then((response) => {
          console.log('info', response);
        })
      },
    }
  }
</script>

<style scoped>
  .detail-container {
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
  .info-wrap {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .info-row {
    display: flex;
    line-height: 50px;
  }
</style>
