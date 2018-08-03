<template>
  <div class="news-item-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">新闻公告</span>
        <ul>
          <li v-for="(item, index) in typeList" :class="{'menu-active': index === typeIdx}"
              @click="selectMenu(item, index)">{{item.title}}
          </li>
        </ul>
      </div>
      <div class="right-content">
        <!--<p class="profession-name">{{professionList[typeIdx].profession_name}}</p>-->
        <!-- notice list -->
        <ul v-if="!selectFlag">
          <li v-for="(item, index) in showTypeNoticeList">
    <!-- -{{item.notice_content}} -->
            <span class="title" @click="selectNoticeDetail(index)">{{item.notice_title}}</span>
            <span class="update-time">{{formatDate(item.update_time)}}</span>
          </li>
        </ul>
        <!-- <ul v-if="!selectFlag">
          <li v-for="(item, index) in showEmploymentList">
            <span class="title" @click="selectEmployment(index)">{{item.employment_title}}</span>
            <span class="update-time">{{formatDate(item.update_time)}}</span>
          </li>
        </ul> -->
        <!-- notice item -->
        <div v-else>
          <h2 class="item-title">{{noticeDetail.notice_title}}</h2>
          <p class="item-date">{{formatDate(noticeDetail.update_time)}}</p>
          <p class="inner-content" v-html="noticeDetail.notice_content"></p>
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
        noticeList: [],
        typeIdx: 0,
        noticeId: 0,
        typeList: [
          {
            title: '学院新闻',
            type: 'XYXW'
          },
          {
            title: '招生公告',
            type: 'ZSGG'
          }
        ],
        noticeType: 'XYXW',
        typeNoticeList: [],
        showTypeNoticeList: [],
        noticeDetail: {},
        totalPage: 1000,
        cur: 1,
        pageSize: 10,
        selectFlag: false
      }
    },
    created () {
      console.log(this.$route.params)
      if (this.$route.params.notice_type) {
        this.noticeType = this.$route.params.notice_type
        this.typeIdx = this.matchNoticeItem()
      }
      if (this.$route.params._id) {
        this.noticeId = this.$route.params._id
        this.noticeDetail = this.$route.params
        this.selectFlag = true
        // this.requestNoticeById()
      } else {
        this.requestNoticeListByType()
      }
    },
    methods: {
//      requestNoticeList () {
//        this.axios.get('/api/notice').then((response) => {
//          console.log('noticeList', response)
//          if (response.status === 200) {
//            this.noticeList = response.data.data
//            this.typeIdx = this.matchNoticeItem()
//          }
//        })
//      },
      requestNoticeListByType () {
        this.axios.get(`/api/notice/${this.noticeType}`).then((response) => {
          console.log('typeList', response.data)
          if (response.status === 200) {
            this.typeNoticeList = response.data.data
            this.totalPage = Math.ceil(this.typeNoticeList.length / this.pageSize)
            this.changeList(this.cur, this.pageSize)
          }
        })
      },
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
        this.selectFlag = false
        this.noticeDetail = {}
        this.typeIdx = index
        this.noticeType = item.type
        this.requestNoticeListByType()
      },
      selectNoticeDetail(index) {
        this.selectFlag = true
        console.log(this.showTypeNoticeList[index])
        this.noticeDetail = this.showTypeNoticeList[index]
      },
      changeList(cur, pageSize) {
        this.showTypeNoticeList = this.typeNoticeList.slice((cur - 1) * pageSize, cur * pageSize)
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
  .news-item-container {
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
  .right-content ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
  }
  .title {
    color: rgb(45, 141, 210);
    font-size: 20px;
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
  .inner-content {
    font-size: 16px;
    text-indent: 32px;
    line-height: 24px;
  }

  .bottom-container {
    /*position: fixed;*/
    /*bottom: 0;*/
  }
</style>
