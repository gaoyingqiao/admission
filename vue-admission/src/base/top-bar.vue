<template>
  <div class="menu-container">
    <div class="logo-wrapper">
      <img class="logo" src="../../static/images/admission/logo.png">
    </div>
    <ul class="menu-list">
      <li v-for="item in menuList" @click="vMenuClicked(item)">{{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuList: [
        {
          title: '首页',
          path: '/',
          node: 'top'
        }, {
          title: '走近学院',
          path: '/collegeInfo',
          node: 'second'
        }, {
          title: '学院简介',
          path: '/profession',
          node: 'top'
        }, {
          title: '报考指南',
          path: '/admission',
          node: 'top'
        }, {
          title: '关于就业',
          path: '/employment',
          node: 'top'
        },
        {
          title: '用户入口',
          path: '/userCenter',
          node: 'top'
        }
      ]
    }
  },
  methods: {
    vMenuClicked (item) {
      this.$emit('menuItemClicked', item)
    }
  }
}
</script>

<style scoped>
  .menu-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 80px;
    color: rgb(172, 177, 177);
    background-color: rgba(0, 0 ,0, .6);
  }
  .logo-wrapper {
    height: 54px;
  }
  .logo {
    width: 400px;
    height: 54px;
  }
  .menu-list {
    display: flex;
    flex-direction: row;
  }
  .menu-list li {
    color: #ffffff;
    padding: 0 20px;
    cursor: pointer;
  }
</style>
