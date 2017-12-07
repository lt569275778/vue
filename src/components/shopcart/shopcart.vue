<template>
  <div class="tmpl">
      <!-- 1.0 商品列表 -->
      <div class="goodsListStyle"> 
        <div v-for="(item,index) in goodsList" :key="item.id" class="everyGoodsItemStyle">
            <!-- 开关 -->
            <mt-switch @change="statisticsTotalCountAndTotalPrice" v-model="switchValues[index]"></mt-switch>
            <!-- 图片 -->
            <div class="goodsImageStyle">
              <img :src="item.thumb_path">
            </div>
            <!-- 标题价格数量 -->
            <div class="titleAndPriceAndCountStyle">
              <h5>{{item.title}}</h5>
              <p>
                <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                商品数量{{item.count}}
              </p>
            </div>
            <!-- 删除按钮 -->
            <mt-button :disabled="!switchValues[index]" class="deletButtonStyle" size="small" @click="deleteGoodsByIndex(index)" type="danger">删 除</mt-button>
        </div>
      </div>

      <!-- 2.0 统计商品信息 -->
      <!-- 2.0 关于商品的统计信息 -->
        <div class="goodsListStatisticsInfoStyle">
            <h5>总计(不含运费)</h5>
            <p>已经勾选商品 <span>{{totalCount}}</span> 件,总价 <span>{{totalPrice}}</span> 元</p>

            <mt-button class="checkStyle" size="small" type="danger">去结算</mt-button>
        </div>
  </div>
</template>

<style scoped>
  /**
    1.0 购物车商品的样式
  */
  .goodsListStyle{
    padding:6px;
  }

  .everyGoodsItemStyle{
    height: 100px;
    display: flex;
    border-bottom: 1px solid rgba(92,92,92,0.3);
    align-items: center;
  }

  .goodsImageStyle{
    padding: 5px;
    border: 1px solid rgba(92,92,92,0.3);
    border-radius: 8px;
    margin-left: 8px;
  }

  .goodsImageStyle img{
    width: 60px;
    height: 60px;
  }

  .deletButtonStyle{
    width:55px;
  }

  .titleAndPriceAndCountStyle{
    margin-left: 8px;
    flex: 1;
  }

  .titleAndPriceAndCountStyle h5{
    font-size: 14px;
    color: #0094ff;
  }

  .titleAndPriceAndCountStyle p{
    margin-top: 20px;
    color: gray;
    font-size: 14px;
  }

  .titleAndPriceAndCountStyle p span{
    color: red;
    font-size: 16px;
  }

  /* 2.0 商品统计信息的样式 */
    .goodsListStatisticsInfoStyle{
        height: 100px;
        background-color: rgba(92,92,92,0.3);
        padding-left: 15px;
        padding-top: 20px;
        position: relative;
    }

    .goodsListStatisticsInfoStyle h5{
        font-size: 16px;
        color: black;
        font-weight: 700;    
    }

    .goodsListStatisticsInfoStyle p{
        margin-top: 10px;

    }

    .goodsListStatisticsInfoStyle span{
        font-size: 16px;
        color: red;
    }
    
    .checkStyle{
        position: absolute;
        top: 35px;
        right: 15px;
    }

</style>


<script>
  import common from '../../common/common.js'

  import {MessageBox} from 'mint-ui'

  export default{
    data(){
      return {
        goodsList:[],
        switchValues : [],
        totalCount:0,
        totalPrice:0
      }
    },
    created(){
      this.getGoodsListData()
    },
    methods:{
      //去服务器获取购物车中的商品信息
      getGoodsListData(){
         //1.从Vuex中获取我们添加到购物车中的数组
         /**
          * [
              {goodsId:88,count:2},
              {goodsId:87,count:3},
              {goodsId:88,count:3}
            ]
          */
        const goodsList = this.$store.getters.getGoodsList

        if(goodsList.length<=0){
              return
        }

        //2.搞一个临时的对象 const tempObj ===> {88:5,87:3} 
        const tempObj = {}
        for(var i = 0;i<goodsList.length;i++){
            var goodsObj = goodsList[i]

            if(tempObj[goodsObj.goodsId]){
              tempObj[goodsObj.goodsId] += goodsObj.count
            }else{
              tempObj[goodsObj.goodsId] = goodsObj.count
            }
        }

        //3.搞一个临时的数组，装id ===> [87,88]
        const tempArray = []
        for(var key in tempObj){
          tempArray.push(key)
        }

        //4.形成需要的参数 ===> 87,88
        const idsString = tempArray.join(",")

        //5.发送网络请求
        const url = common.apihost + "api/goods/getshopcarlist/"+idsString
        this.$http.get(url).then(res=>{
          res.body.message.forEach(item=>{
            item.count = tempObj[item.id]

            this.switchValues.push(true)
          })
          /**
           * [
              {id:87,title:'华为',sell_price:2195,thumb_path:'http:www.xxx.com/1.png',count:3},
              {id:88,title:'苹果',sell_price:5780,thumb_path:'http:www.ooo.com/1.png',count:5}
            ]
           */
          this.goodsList = res.body.message

          //刚开始统计一下信息
          this.statisticsTotalCountAndTotalPrice()
        })
      },
      //计算我们的统计信息
      statisticsTotalCountAndTotalPrice(){
        let tempCount = 0
        let tempPrice = 0
        this.switchValues.forEach((item,i)=>{
          if(item){
             tempCount+=this.goodsList[i].count
             tempPrice+=this.goodsList[i].count * this.goodsList[i].sell_price
          }
        })

        //赋值给我们totalCount&totalPrice即可
        this.totalCount = tempCount
        this.totalPrice = tempPrice
      },
      //删除某一行
      deleteGoodsByIndex(index){
         MessageBox.confirm('确定删除该条数据吗?').then(action => {
            //1.获取到索引对应的商品id,然后从仓库中干掉
            const goodsId = this.goodsList[index].id
            this.$store.commit('deleteGoodsById',goodsId)

            //2.干掉switchValues和goodsList中，对应索引的元素
            this.switchValues.splice(index,1)
            this.goodsList.splice(index,1)

            //3.重新计算统计信息
            this.statisticsTotalCountAndTotalPrice()
         },cancel=>{
           
         })
      }
    }
  }
</script>