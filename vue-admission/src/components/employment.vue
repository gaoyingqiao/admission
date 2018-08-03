<template>
  <div class="employment-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">最新招聘信息</span>
        <ul>
          <li class="menu-active">招聘信息</li>
        </ul>
      </div>
      <div class="right-content">
        <ul v-if="!selectFlag">
          <li v-for="(item, index) in showEmploymentList">
            <span class="title" @click="selectEmployment(index)">{{item.employment_title}}</span>
            <span class="update-time">{{formatDate(item.update_time)}}</span>
          </li>
        </ul>
        <div v-else>
          <h2 class="item-title">{{employmentList[activeIdx].employment_title}}</h2>
          <p class="item-date">{{formatDate(employmentList[activeIdx].update_time)}}</p>
          <p v-html="employmentList[activeIdx].employment_content"></p>
        </div>

        <VPagination v-if="!selectFlag" :totalPage="totalPage"
          :currentPage="cur"
          @changePage="vChangePage"></VPagination>
      </div>
    </div>

    <!--<bottom class="bottom-container"></bottom>-->
  </div>
</template>

<script type="text/ecmascript-6">
  import TopBar from '../base/top-bar'
  import Bottom from '../base/bottom'
  import VPagination from '../base/VPagination'

  export default {
    data() {
      return {
        employmentList: [],
        showEmploymentList: [],
        selectFlag: false,
        activeIdx: -1,
        totalPage: 1000,
        cur: 1,
        pageSize: 10
      }
    },
    created() {
      this.requestEmploymentList()
    },
    methods: {
      requestEmploymentList() {
        this.axios.get('/api/employment').then((response) => {
          console.log('employment', response)
          if (response.status === 200) {
            this.employmentList = response.data.data
            this.totalPage = Math.ceil(this.employmentList.length / this.pageSize)
            this.changeList(this.cur, this.pageSize)
          }
        })
      },
      selectEmployment (index) {
        this.selectFlag = true
        this.activeIdx = index
      },
      changeList(cur, pageSize) {
        this.showEmploymentList = this.employmentList.slice((cur - 1) * pageSize, cur * pageSize);
      },
      vChangePage (e) {
        console.log('nowPage', e)
        if (e === this.cur) {
          return
        }
        this.cur = e
        this.changeList(this.cur, this.pageSize)
      },
      vMenuItemClicked (e) {
        // menuItem点击跳转        console.log('vMenuItemClicked', e)
        this.$router.push(e.path)
      },
      /*===== handel event ======*/
      formatDate(time) {
        let date = new Date(time).toLocaleString()
        return date
      }
    },
    components: {TopBar, Bottom, VPagination}
  }
</script>

<style scoped>
  .employment-container {
    /*position: relative;*/
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
    /*margin: 0 auto;*/
  }

  .right-content ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }

  .title {
    color: rgb(45, 141, 210);
    font-size: 24px;
    cursor: pointer;
  }

  .update-time {
    color: #a0a0a0;
  }

  .item-title {
    line-height: 40px;
    font-size: 28px;
    text-align: center;
  }

  .item-date {
    line-height: 30px;
    font-size: 18px;
    text-align: center;
    color: #a0a0a0;
  }

  .bottom-container {
    /*position: fixed;*/
    /*bottom: 0;*/
  }
</style>
