<template>
   <div class='tmpl'>
       <!-- 1.0 标题 -->
       <div class="titleStyle">
            <h4>{{pictureAndText.title}}</h4>
       </div>

       <!-- 2.0 内容 -->
       <div class="contentStyle">
            <p v-html="pictureAndText.content"></p>
       </div>
   </div>
</template>
   
<style scoped>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       color: #0094ff;
       font-size: 16px;
       font-weight: 900;
       border-bottom: 1px solid rgba(92,92,92,0.3);
       padding-bottom: 8px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               pictureAndText : {}
           }
       },
       created() {
           this.getPictureAndTextData()
       },
       methods: {
           getPictureAndTextData(){
               const url = common.apihost + "api/goods/getdesc/"+this.$route.params.goodsId

               this.$http.get(url).then(res=>{
                   this.pictureAndText = res.body.message[0]
               })
           }
       }
   }
</script>