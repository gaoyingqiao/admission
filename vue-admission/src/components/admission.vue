<template>
  <div class="admission-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">报考指南</span>
        <ul>
          <li v-for="(item, index) in typeMenu" :class="{'menu-active': index === typeIdx}"
              @click="selectMenu(index)">{{item.name}}
          </li>
        </ul>
      </div>
      <div class="right-content">
        <ul>
          <li v-for="(item, index) in admissionList" :class="{'vintage-active': index === activeIdx}"
              @click="selectVintage(index)">{{item.admission_vintage}}
          </li>
        </ul>
        <div class="inner-content" v-html="admissionList[activeIdx].admission_content"></div>
      </div>
    </div>
    <!--<bottom class="bottom-container"></bottom>-->
  </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import TopBar from '../base/top-bar'
  import Bottom from '../base/bottom'

  export default {
    data() {
      return {
        admissionList: [],
        type: 'ZSJH',
        activeIdx: 0,
        typeMenu: [
          {
            type: 'ZSJH',
            name: '招生计划'
          },
          {
            type: 'LSJL',
            name: '历史录取分数'
          }
        ],
        typeIdx: 0
      }
    },
    created() {
      this.requestAdmissionList()
    },
    methods: {
      requestAdmissionList() {
        this.axios.get(`/api/admission/${this.type}`).then((response) => {
          console.log('admission', response)
          if (response.status === 200) {
            this.admissionList = response.data.data
          }
        })
      },
      selectMenu (index) {
        // 显示对应你年份内容
        if (this.typeIdx === index) {
          return
        }
        this.typeIdx = index;
        this.type = this.typeMenu[this.typeIdx].type
        this.activeIdx = 0
        this.requestAdmissionList()
      },
      selectVintage (index) {
        // 显示对应年份内容
        this.activeIdx = index
      },
      vMenuItemClicked (e) {
        // menuItem点击跳转
        console.log('vMenuItemClicked', e)
        this.$router.push(e.path)
      },
      /*===== handel event ======*/
      formatDate(time) {
        let date = new Date(time).toLocaleString()
        return date
      }
    },
    components: {TopBar, Bottom}
  }
</script>

<style scoped>
  .admission-container {
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
    /*position: fixed;*/
    /*top: 0;*/
    width: 100%;
    height: 200px;
    /*z-index: 899;*/
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

  .right-content ul {
    background-color: #eeeeee;
    height: 40px;
    line-height: 40px;
    color: #333;
  }

  .right-content ul li {
    float: left;
    padding: 0 20px;
    cursor: pointer;
  }

  .vintage-active {
    background-color: #46a1da;
    color: #ffffff;
  }

  .inner-content {
    margin-top: 20px;
    padding-bottom: 20px;
  }
</style>
