<template>
  <div>
      <!-- 1.0 头部,标题栏 -->
      <mt-header fixed title="Vue项目"></mt-header>

      <div v-show="isShowBack" @click="goBack" class="backStyle">&lt;返回</div>

      <!-- 2.0 中间内容，根据路由动态变化 -->
      <router-view></router-view>

      <!-- 3.0 底部的tabBar -->
      <mt-tabbar fixed :class="isShowTabBar ? '' : 'tabBarStyleHidden' ">
        <mt-tab-item>
          <router-link to="/home">
            <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/category">
            <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/shopcart">
            <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
            <span class="badgeStyle">{{myCount}}</span>
          </router-link>
        </mt-tab-item>
        <mt-tab-item>
          <router-link to="/mine">
            <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
          </router-link>
        </mt-tab-item>
      </mt-tabbar>
  </div>
</template>

// scoped代表样式私有
<style scoped>
  .backStyle{
    z-index: 2;
    position: fixed;
    left:15px;
    top:10px;
    font-size: 14px;
    color: #fff;
    font-weight: 900;
  }

  .tabBarStyleHidden{
    display: none;
  }

  img{
    width:42px;
    height: 35px;
  }

  .mint-tabbar>.mint-tab-item.is-selected{
    background-color: #fafafa;
  }

  .badgeStyle{
      font-size: 11px;
      line-height: 1.3;  
      position: absolute;
      top: 7px;
      left: 63%;
      text-align: center;
      padding: 1px 5px; 
      color: #fff;
      border-radius: 11px; 
      background: red;
    }
</style>

<script>
  //导入公共的Vue对象
  import bus from './common/commonvue.js'

  export default{
    data(){
      return {
        isShowTabBar:true,
        isShowBack:false,
        myCount:0
      }
    },
    methods:{
      goBack(){
        this.$router.go(-1)
      },
      isShowOrHidden(path){
          if(path=="/home"){
            this.isShowTabBar = true
            this.isShowBack = false
          }else{
            this.isShowTabBar = false
            this.isShowBack = true
          }
      }
    },
    created(){
        this.isShowOrHidden(this.$route.path)

        //监听加入购物车的动作
        // bus.$on('goodsCount',function(count){
        //     this.myCount+=count
        // }.bind(this))
    },
    updated(){//当仓库的值，发生更改，同样会调用这个方法
      this.myCount = this.$store.getters.getGoodsCount
    },
    watch:{
      /**
      "$route":(newValue,oldValue)=>{
          console.log(this)
          if(newValue.path=="/home"){
            this.isShowTabBar = true
          }else{
            this.isShowTabBar = false
            console.log(this.isShowTabBar)
          }
      }
      */
      "$route":function(newValue,oldValue){
          this.isShowOrHidden(newValue.path)
      }
    }
  }
</script> 

