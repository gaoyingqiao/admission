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

  </div>
</template>

<script type="text/ecmascript-6">
  import TopBar from '../base/top-bar'
  import Bottom from '../base/bottom'
  import VPagination from '../base/VPagination'

  export default {
    data() {
      return {

      }
    },
    created () {
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
      createInfo () {
        this.axios.post('/api/info/addInfo', {
          student_id:
        }).then((response) => {
          console.log('info', response);
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

</style>
