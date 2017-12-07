<template>
   <div class='tmpl'>
       <div class="mui-content" style="background-color:#fff">
		    <ul class="mui-table-view mui-grid-view">
		        <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
		            <router-link :to="'/goods/goodsinfo/'+item.id">
                        <div class="goodsContentStyle">
                            <img class="mui-media-object" :src="item.img_url">
                            <div class="mui-media-body">
                                <!-- 1.0 标题 -->
                                <p id="titleStyle">{{item.title}}</p>
                                <!-- 2.0 价格 -->
                                <p class="price">
                                    <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                                    <s>{{item.market_price}}</s>
                                </p>
                                <!-- 3.0 提示 -->
                                <p class="tips">
                                    <span>热卖中</span>
                                    <span>剩余{{item.stock_quantity}}件</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
		    </ul>    
		</div>
   </div>
</template>
   
<style scoped>
   .goodsContentStyle{
       padding: 10px;
       border: 1px solid rgba(92,92,92,0.3);
       border-radius: 5px;
       box-shadow: 0px 0px 5px rgba(92,92,92,0.3);
   }

   .mui-grid-view .goodsContentStyle .mui-media-body{
       height: 100px;
   }

   #titleStyle{
       font-size: 12px;
       color: black;
       text-align: left;
       overflow:hidden; 
       text-overflow:ellipsis;
       display:-webkit-box;
       -webkit-box-orient:vertical;
       -webkit-line-clamp:2;
       white-space: pre-wrap;
       /* 两行显示不下... */
       /* http://blog.csdn.net/bing0728004/article/details/51509435 */
   }

   .price{
       text-align: left;
       height: 35px;
       padding-top: 10px;
       background-color: #f0f0f0;
   }

   .price span{
       font-size: 16px;
       color: red;
   }

   .tips{
       padding-top: 15px;
       padding-bottom: 10px;
       text-align: left;
       height: 40px;
       background-color: #f0f0f0;
       display: flex;
       justify-content: space-between;
   }

</style>
   
<script>
   import common from '../../common/common.js'

   export default {
       data() {
           return {
               goodsList : []
           }
       },
       created() {
           this.getGoodsListData()
       },
       methods: {
           getGoodsListData(){
                const url = common.apihost+"api/getgoods"

                const _this = this
                this.$axios.get(url)
                .then(function (response) {
                    _this.goodsList = response.data.message
                }).catch(function (response) {
                    console.log(response);
                })
           }
       }
   }
</script>