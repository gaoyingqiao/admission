<template>
  <div class="swiper-item" :style="{'-webkit-transform':imgLateX, height: imgHeight+'px'}">
    <div class="item-container" :style="{width: imgWidth+'px', height: imgHeight+'px'}">
      <img :src="img" :style="{width: imgWidth+'px', height: imgHeight+'px'}">
      <span :style="{width: imgWidth+'px'}" class="item-intro" v-if="intro" v-text="intro"></span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'swiper-item',
    props:{
      img:{
        type:String
      },
      intro: {
        type: String
      },
      imgWidth:{
        type:Number,
        default:100
      },
      imgHeight: {
        type: Number,
        default: 100
      },
      scrollWidth: {
        type: Number,
        default: 100
      }
    },
    created() {
//      console.log('intro', this.intro)
    },
    data () {
      return {
      }
    },
    computed:{
      imgLateX(){
        return 'translate3d('+(this.scrollWidth)+'px,0,0)'
      }
    }
  }
</script>

<style scoped>
  .swiper-item{
    width: 100%;
    position: absolute;
    top:0;
    left:0;
    /*height: 500px;*/
  }
  .item-container {
    position: relative;
  }
  .swiper-item img{
  }
  .item-intro {
    display: inline-block;
    position: absolute;
    bottom: 100px;
    text-align: center;
    font-size: 32px;
    color: #ffffff;
  }
</style>
