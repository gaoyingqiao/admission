<template>
  <div class="news-container">
    <div class="title-wrap">
      <span class="title-text">{{typeString}}</span>
    </div>
    <div class="news-inner">
      <div class="inner-wrap" v-for="item in newsShow">
        <div class="item-inner">
          <img class="pic" :src="item.notice_url">
          <h3 class="title">{{item.notice_title}}</h3>
          <p class="date">{{formatDate(item.update_time)}}</p>
          <div class="content" v-html="item.notice_content"></div>
          <span class="jump-button" @click="jumpToDetail(item)">了解详情</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {

      }
    },
    props: {
      news: {
        type: Array,
        default: []
      },
      typeString: {
        type: String,
        default: ''
      }
    },
    computed: {
      newsShow() {
        if (this.news.length > 3) {
          return this.news.splice(0, 3)
        } else {
          return this.news
        }
      }
    },
    created () {
      console.log('typeString', this.typeString)
    },
    methods: {
      jumpToDetail(item) {
        // this.$emit('jumpToNews', {noticeId: item['_id'], noticeType: item.notice_type})
        this.$emit('jumpToNews', item)
      },
      formatDate(time) {
        let date = new Date(time).toLocaleString()
        let fmtDate = date.split(' ')
        return fmtDate[0]
      }
    }
  }
</script>

<style scoped>
  .news-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
  .news-inner {
    display: flex;
    justify-content: center;
    /*width: 900px;*/
  }
  .inner-wrap {
    background-color: #ffffff;
    margin-right: 20px;
    width: 350px;
  }
  .inner-wrap:nth-of-type(3n) {
    margin-right: 0;
  }
  .item-inner {
    padding: 15px;
  }
  .pic {
    width: 320px;
    height: 220px;
  }
  .title {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    line-height: 30px;
    font-size: 14px;
    color: #999;
  }
  .content {
    height: 60px;
    font-size: 14px;
    line-height: 20px;
    text-indent: 28px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
    color: #666;
  }
  .jump-button {
    margin-top: 16px;
    display: block;
    background: #046ace;
    color: #ffffff;
    font-size: 16px;
    line-height: 40px;
    text-align: center;
  }
</style>
