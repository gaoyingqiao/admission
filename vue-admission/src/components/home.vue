<template>
  <div class="container">
    <top-bar class="top-container" @menuItemClicked="vMenuItemClicked"></top-bar>
    <div class="main-container">
      <swiper :imgList="sliderList" :imgWidth="screenWidth" :imgHeight="screenHeight"></swiper>
      <news v-show="newsList" :news="newsList" :typeString="newsType" @jumpToNews="jumpToNews"></news>
      <news v-show="admissionList" :news="admissionList" :typeString="admissionType" @jumpToNews="jumpToNews"></news>
      <profession :professionList="professionList" @jumpToDetail="jumpToDetail"></profession>
    </div>
    <bottom class="bottom-container"></bottom>
  </div>
</template>

<script>
  import TopBar from '../base/top-bar';
  import Bottom from '../base/bottom';
  import Swiper from '../base/swiper';
  import Profession from './profession';
  import News from './news';

  export default {
    data() {
      return {
        sliderList: [],
        screenWidth: document.documentElement.clientWidth,
        screenHeight: document.documentElement.clientHeight,
        timer: false,
        professionList: [],
        newsList: [],
        admissionList: [],
        newsType: '校内新闻',
        admissionType: '招生公告'
      };
    },
    created() {
      console.log('screenWidth', this.screenWidth, 'screenHeight', this.screenHeight);
      this.requestSliderList();
      this.requestProfessionList();
      this.requestNoticeXYXW();
      this.requestNoticeZSGG();
    },
    methods: {
      requestSliderList () {
        this.axios.get('/api/slider').then((response) => {
          console.log('slider', response);
          if (response.status === 200) {
            this.sliderList = response.data.data;
          }
        });
      },
      requestProfessionList () {
        this.axios.get('/api/profession').then((response) => {
          console.log('profession', response);
          if (response.status === 200) {
            this.professionList = response.data.data;
          }
        });
      },
      requestNoticeXYXW() {
        this.axios.get('/api/notice/XYXW').then((response) => {
          console.log('XYXW', response);
          if (response.status === 200) {
            this.newsList = response.data.data.splice(0, 3);
          }
        });
      },
      requestNoticeZSGG() {
        this.axios.get('/api/notice/ZSGG').then((response) => {
          console.log('ZSGG', response);
          if (response.status === 200) {
            this.admissionList = response.data.data.splice(0, 3);
          }
        });
      },
      jumpToNews (e) {
        console.log('jumpToNews', e);
        // this.$router.push({
        //   name: 'newsItem', params: {
        //     noticeId: e.noticeId,
        //     noticeType: e.noticeType
        //   }
        // });
        this.$router.push({name: 'newsItem', params: e});
      },
      jumpToDetail (e) {
        console.log('jumpToDetail', e);
        this.$router.push({
          name: 'professionItem', params: {
            professionId: e.professionId
          }
        });
      },
      vMenuItemClicked (e) {
        // menuItem点击跳转
        console.log('vMenuItemClicked', e);
        this.$router.push(e.path);
      }
    },
    mounted () {
      const that = this;
      window.resize = () => {
        return (() => {
          window.screenWidth = document.documentElement.clientWidth;
          window.screenHeight = document.documentElement.screenHeight;
          that.screenWidth = window.screenWidth;
          that.screenHeight = window.screenHeight;
        })();
      };
    },
    components: {TopBar, Bottom, Swiper, Profession, News}
  };
</script>

<style scoped>
  .container {
    position: relative;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    background-color: #eeeeee;
  }

  .top-container {
    position: fixed;
    top: 0;
    z-index: 999;
  }

  .main-container {
    background: #eeeeee;
  }

  .bottom-container {
    /*position: fixed;*/
    /*bottom: 0;*/
  }
</style>
