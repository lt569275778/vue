<template>
   <div class='tmpl' v-show="!isLoading">
        <!-- 1.0 标题 -->
        <div class="titleStyle">
            <h5>
                {{newsInfo.title}}
            </h5>
            <p>
                {{newsInfo.add_time | dateFmt}}&nbsp;&nbsp;&nbsp;
                {{newsInfo.click}}次浏览&nbsp;&nbsp;&nbsp;
                分类:民生经济
            </p>
        </div>
        <!-- 2.0 新闻内容 -->
        <div class="contentStyle">
            <p v-html="newsInfo.content"></p>
        </div>
        <!-- 3.0 评论子组件 -->
        <subcomment :commentId="this.$route.params.newsId"></subcomment>
   </div>
</template>
    
<style scoped>
    .titleStyle,.contentStyle{
        padding: 6px;
    }

    h5{
        font-size: 16px;
        font-weight: 900;
        color: #0094ff;
    }

    .titleStyle p{
        margin-top:10px;
    }

    .titleStyle{
        border-bottom: 1px solid rgba(92,92,92,0.4);
    }
</style>
    
<script>
    import common from '../../common/common.js'

    import { Indicator } from 'mint-ui'

    //导入评论子组件
    import subcomment from '../subcomponents/subcomment.vue'
    
    export default {
        data() {
            return {
                newsInfo : {},
                isLoading:true
            }
        },
        created() {
            this.getNewsInfoData()
        },
        methods: {
            getNewsInfoData(){
                const url = common.apihost+"api/getnew/"+this.$route.params.newsId

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'triple-bounce'
                })

                this.$http.get(url).then(response=>{
                    this.newsInfo = response.body.message[0]
                    this.isLoading = false
                    Indicator.close()
                },err=>{
                    Indicator.close()
                })
            }
        },
        components:{
            subcomment:subcomment //属性名称将来父组件在template使用子组件时候的一个名称，值就是我们子组件
        }
    }
</script>