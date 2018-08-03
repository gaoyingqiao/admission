<template>
  <div class="grade-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">用户中心</span>
        <ul>
          <li class="menu-active">信息查看</li>
        </ul>
      </div>
      <div class="right-content">
        <!-- 登录内容 -->
        <!-- 成绩查询结果 -->
        <router-view></router-view>
      </div>
    </div>

    <!--<bottom class="bottom-container"></bottom>-->
  </div>
</template>

<script type="text/ecmascript-6">
    import TopBar from '../base/top-bar'
    import Bottom from '../base/bottom'

    export default {
      data() {
        return {
          studentDetails: {},
          loginFlag: false
        }
      },
      created () {
        // 判断学生是否已经登录
        if (sessionStorage.getItem('token')) {
          // 显示学生成绩信息
          this.loginFlag = true
          this.$router.push({name: 'userDetail', params: {id: sessionStorage.getItem('id')}})
        } else {
          // 跳转到登录页面
          // 登录页面选择注册还是登录
          this.loginFlag = false
          this.$router.push({name: 'login'})
        }
      },
      methods: {
        requestNoticeById () {
          this.axios.get(`/api/notice/${this.noticeId}`).then((response) => {
            console.log('notice', response)
            if (response.status === 200) {
              this.noticeDetail = response.data.data
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
          this.noticeType = item.type
          this.requestNoticeListByType()
        },
        selectItem(item) {
          // 点击选中item
        },
        vMenuItemClicked (e) {
          // menuItem点击跳转
          console.log('vMenuItemClicked', e)
          this.$router.push(e.path)
        },
        /*==== match event====*/
        matchNoticeItem () {
          for (let i = 0, len = this.typeList.length; i < len; i++) {
            if (this.noticeType === this.typeList[i].type) {
              return i
            }
          }
        }
      },
      components: {TopBar, Bottom}
    }
</script>

<style scoped>
  .grade-container {
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

  .bottom-container {
    /*position: fixed;*/
    /*bottom: 0;*/
  }
</style>
