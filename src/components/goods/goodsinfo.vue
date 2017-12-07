<template>
   <div class='tmpl'>
       <!-- 1.0 商品的轮播 -->
       <div class="goodsLunboStyle">
            <subswipe :lunbo_url="'api/getthumimages/'+$route.params.goodsId" :lunbo_time="time"></subswipe>
       </div>

       <!-- 2.0 商品的价格相关 -->
       <div class="goodsPriceStyle">
            <h4>{{goodsInfo.title}}</h4>
            <p>市场价:<s>{{goodsInfo.market_price}}</s>&nbsp;&nbsp;销售价:<span>{{goodsInfo.sell_price}}</span></p>
            <subnumber v-on:numberChange="getSubNumberCount"></subnumber>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" @click="addToShopCart" size="small">加入购物车</mt-button>
       </div>

       <!-- 3.0 商品参数相关 -->
       <div class="goodsParamsStyle">
            <h5>商品参数</h5>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>库存情况:剩余{{goodsInfo.stock_quantity}}件</li>
                <li>上架时间:{{goodsInfo.add_time | dateFmt}}</li>    
            </ul>
       </div>

       <!-- 4.0 图文信息相关 -->
       <div class="PictureAndTextStyle">
            <mt-button type="primary" size="large" @click="goPictureAndTextIntroduction" plain>图文介绍</mt-button>
            <mt-button type="danger" class="goodsCommentStyle" @click="goGoodsComment" size="large" plain>商品评论</mt-button>
       </div>
   </div>
</template>
   
<style scoped>
   .goodsLunboStyle,.goodsPriceStyle,.goodsParamsStyle,.PictureAndTextStyle{
       margin: 10px;
       padding: 10px;
       border: 1px solid rgba(92,92,92,0.3);
       border-radius: 5px;
   }

   h4{
       font-size: 16px;
       color: #0094ff;
       border-bottom: 1px solid rgba(92,92,92,0.3);
       padding-bottom: 10px;
   }
   
   .goodsPriceStyle span{
       color: red;
       font-size: 16px;
   }

   h5{
       border-bottom: 1px solid rgba(92,92,92,0.3);
       padding-bottom: 10px;
   }

   .goodsParamsStyle ul{
       padding: 0px;
       margin: 0px;
   }

   .goodsParamsStyle li{
       list-style: none;
   }

   .goodsCommentStyle{
       margin-top: 15px;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   import subswipe from '../subcomponents/subswipe.vue'

   import subnumber from '../subcomponents/subnumber.vue'

   import bus from '../../common/commonvue.js'

   import {Toast} from 'mint-ui'
   
   export default {
       data() {
           return {
               time:2000,
               goodsInfo : {},
               myCount:1
           }
       },
       created() {
           this.getGoodsInfoData()
       },
       methods: {
           getGoodsInfoData(){
                const url = common.apihost+"api/goods/getinfo/"+this.$route.params.goodsId

                const _this = this
                this.$axios.get(url).then(res=>{
                    _this.goodsInfo = res.data.message[0]
                })
           },
           //跳转到图文介绍里面去
           goPictureAndTextIntroduction(){
               this.$router.push({ name: 'pictureAndTextIntruduction', params: { goodsId: this.$route.params.goodsId }})
           },
           //跳转到商品评论
           goGoodsComment(){
               this.$router.push({path:"/goods/goodscomment" ,query:{goodsId:this.$route.params.goodsId}})
           },
           //当子组件传值过来之后，我们就能通过次函数获取到子组件中的值
           getSubNumberCount(count){
                this.myCount = count
           },
           //加入购物车
           addToShopCart(){
                //bus.$emit('goodsCount',this.myCount)

                Toast({
                    message: '加入购物车成功',
                    position: 'middle',
                    duration: 2000
                })

                //将商品对象添加到仓库中
                const goodsObj = {goodsId:this.$route.params.goodsId,count:this.myCount}

                this.$store.commit('addGoods',goodsObj)
                
                // const _this = this
                // setTimeout(function(){
                //     _this.$store.dispatch('addGoodsAction',goodsObj)
                // },2000)
           }
       },
       components:{
           subswipe,
           subnumber
       }
   }
</script>