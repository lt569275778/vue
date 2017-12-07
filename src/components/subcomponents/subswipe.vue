<template>
   <div>
       <mt-swipe :auto="lunbo_time">
            <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
                <img :src="item.img">
            </mt-swipe-item>
        </mt-swipe>
   </div>
</template>
   
<style scoped>
    /* 1.0 轮播的样式 */
    img {
      width: 100%;
      height: 250px;
    }

    .mint-swipe {
      width: 100%;
      height: 250px;
    }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               lunboArray:[]
           }
       },
       created() {
           this.getLunboData()
       },
       methods: {
            //获取轮播需要的数据
            getLunboData() {
                //this代表的是我们Vue对象
                const url = common.apihost+this.lunbo_url

                this.$http.get(url).then(response => {
                    this.lunboArray = response.body.message
                })
            }
       },
       props:['lunbo_url','lunbo_time']
   }
</script>