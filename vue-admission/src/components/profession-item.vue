<template>
  <div class="profession-item-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">专业介绍</span>
        <ul>
          <li v-for="(item, index) in professionList" :class="{'menu-active': index === typeIdx}"
              @click="selectMenu(item, index)">{{item.profession_name}}
          </li>
        </ul>
      </div>
      <div class="right-content">
        <p class="profession-name">{{professionList[typeIdx].profession_name}}</p>
        <p class="profession-desc" v-html="professionList[typeIdx].profession_desc"></p>
        <h3 class="blue-text" v-if="questionList.length !== 0">相关问题解答</h3>
        <div class="question-wrap" v-for="(item, index) in questionList">
          <p class="question">{{index+1}}、{{item.question_title}}</p>
          <p class="answer" v-html="item.question_answer"></p>
        </div>
      </div>
    </div>

    <!--<bottom class="bottom-container"></bottom>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import TopBar from '../base/top-bar'
  import Bottom from '../base/bottom'

  export default {
    data () {
      return {
        professionList: [],
        typeIdx: 0,
        professionId: 0,
        questionList: []
      }
    },
    created () {
      if (this.$route.params) {
        console.log(this.$route.params)
        this.professionId = this.$route.params.professionId
      }
      this.requestProfessionList()
    },
    methods: {
      requestProfessionList () {
        this.axios.get('/api/profession').then((response) => {
          console.log('professionList', response)
          if (response.status === 200) {
            this.professionList = response.data.data
            if (!this.professionId) {
              this.professionId = this.professionList[0]['_id']
            }
            this.typeIdx = this.matchProfessionItem()
            this.requestQuestion()
          }
        })
      },
      requestQuestion () {
        this.axios.get(`/api/question/${this.professionId}`).then((response) => {
          console.log('question', response)
          if (response.status === 200) {
            this.questionList = response.data.data
          }
        })
      },
      selectMenu (item, index) {
        // 点击跳转
        console.log(item, index)
        if (index === this.typeIdx) {
          return
        }
        this.typeIdx = index
        this.professionId = item['_id']
        this.requestQuestion()
      },
      vMenuItemClicked (e) {
        // menuItem点击跳转
        console.log('vMenuItemClicked', e)
        this.$router.push(e.path)
      },
      /*==== match event====*/
      matchProfessionItem () {
        for (let i = 0, len = this.professionList.length; i < len; i++) {
          if (this.professionId === this.professionList[i]['_id']) {
            return i
          }
        }
      }
    },
    components: {TopBar, Bottom}
  }
</script>

<style scoped>
  .profession-item-container {
  }

  .top-container {
    position: relative;
  }

  .top-bar {
    position: absolute;
    top: 0;
    z-index: 999;
  }

  .sub-bg {
    width: 100%;
    height: 200px;
  }

  .main-container {
    display: flex;
    justify-content: center;
  }

  .left-menu {
    position: relative;
    width: 200px;
    background-color: #ffffff;
    margin-right: 30px;
  }

  .menu-title {
    position: absolute;
    top: -52px;
    width: 200px;
    line-height: 50px;
    background-color: #8cb721;
    color: #ffffff;
    font-size: 24px;
    text-align: center;
  }

  .left-menu ul {
    position: absolute;
    top: -2px;
    width: 198px;
    border: 1px solid #ccc;
  }

  .left-menu ul li {
    width: 100%;
    text-align: center;
    line-height: 40px;
    font-size: 18px;
    color: #333333;
    cursor: pointer;
  }

  .menu-active {
    background-color: #46a1da;
    color: #ffffff;
  }

  .right-content {
    width: 900px;
    padding-top: 30px;
  }

  .profession-name {
    line-height: 50px;
    font-size: 24px;
    border-bottom: 2px solid #eeeeee;
  }

  .profession-desc {
    font-size: 14px;
    line-height: 24px;
    text-indent: 28px;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .blue-text {
    color: #46a1da;
    font-size: 20px;
    font-weight: 500;
  }

  .question-wrap {
    font-size: 16px;
    color: #333333;
    line-height: 28px;
    margin-top: 15px;
    margin-bottom: 20px;
  }

  .answer {
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    line-height: 24px;
    color: #999999;
    padding: 10px;
  }

  .bottom-container {
    /*position: fixed;*/
    /*bottom: 0;*/
  }
</style>
