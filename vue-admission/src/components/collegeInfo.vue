<template>
  <div class="profession-item-container">
    <div class="top-container">
      <top-bar class="top-bar" @menuItemClicked="vMenuItemClicked"></top-bar>
      <img src="/static/images/admission/sub_bg.jpg" class="sub-bg">
    </div>
    <div class="main-container">
      <div class="left-menu">
        <span class="menu-title">学院实力</span>
        <ul>
          <li v-for="(item, index) in collegeInfoList" :class="{'menu-active': index === typeIdx}"
              @click="selectMenu(item, index)">{{item.college_title}}
          </li>
        </ul>
      </div>
      <div class="right-content">
        <p class="info-desc" v-html="collegeInfoList[typeIdx].college_content"></p>
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
        collegeInfoList: [],
        infoId: undefined,
        typeIdx: 0
      }
    },
    created() {
      this.requestCollegeInfoList()
    },
    methods: {
      requestCollegeInfoList () {
        this.axios.get('/api/getCollege').then((response) => {
          console.log('getCollege', response)
          if (response.status === 200) {
            this.collegeInfoList = response.data.data
            if (!this.infoId) {
              this.infoId = this.collegeInfoList[0]['_id']
            }
            this.typeIdx = this.matchCollegeItem()
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
        this.infoId = item['_id']
      },
      vMenuItemClicked (e) {
        // menuItem点击跳转
        console.log('vMenuItemClicked', e)
        this.$router.push(e.path)
      },
      /*==== match event====*/
      matchCollegeItem () {
        for (let i = 0, len = this.collegeInfoList.length; i < len; i++) {
          if (this.infoId === this.collegeInfoList[i]['_id']) {
            return i
          }
        }
      }
    },
    components: {TopBar, Bottom}
  }
</script>

<style scoped>
.info-container {
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

.info-desc {
  font-size: 14px;
  line-height: 24px;
  text-indent: 28px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.bottom-container {
  /*position: fixed;*/
  /*bottom: 0;*/
}
</style>
