<template>
  <div class="profession-container">
    <div class="title-wrap">
      <span class="title-text">信息学院招生专业简介</span>
    </div>
    <div class="profession-item">
      <div class="item-wrap" v-for="item in professionList">
        <div class="item-inner">
          <img class="pic" :src="item.profession_pic">
          <h3 class="name">{{item.profession_name}}</h3>
          <div class="intro" v-html="item.profession_desc"></div>
          <span @click="jumpToDetail(item._id)" class="jump-button">了解详情</span>
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
      professionList: {
        type: Array,
        default: []
      }
    },
    methods: {
      jumpToDetail (professionId) {
        this.$emit('jumpToDetail', {professionId: professionId});
      }
    }
  }
</script>

<style scoped>
  .profession-container {
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
  .profession-item {
    width: 1000px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .item-wrap {
    background-color: #ffffff;
    width: 300px;
    margin-right: 50px;
    margin-bottom: 20px;
  }
  .item-wrap:nth-of-type(3n) {
    margin-right: 0;
  }
  .item-inner {
    padding: 20px;
  }
  .pic {
    width: 260px;
    height: 150px;
  }
  .name {
    line-height: 40px;
    font-size: 20px;
    text-align: center;
  }
  .intro {
    /*height: 300px;*/
    font-size: 16px;
    line-height: 20px;
    text-indent: 32px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 6;
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
