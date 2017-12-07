<template>
   <div class='tmpl'>
        <!-- 1.0 标题 -->
        <div class="titleStyle">
            <h4>{{photoInfo.title}}</h4>
            <p>
                {{photoInfo.add_time | dateFmt('YYYY-MM-DD')}}&nbsp;&nbsp;
                {{photoInfo.click}}次浏览
            </p>
        </div>

        <!-- 2.0 缩略图 -->
        <div class="mui-content">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li v-for="(item,index) in thumbImages" :key="index" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <img class="preview-img" width="100" height="100" :src="item.src"  @click="$preview.open(index, thumbImages)"> 
                </li>
            </ul> 
		</div>

        <!-- 3.0 内容 -->
        <div class="contentStyle">
            <p v-html="photoInfo.content"></p>
        </div>

        <!-- 4.0 评论 -->
        <subcomment :commentId="this.$route.params.photoId"></subcomment>
   </div>
</template>
    
<style scoped>
    .titleStyle,.contentStyle{
        padding: 6px;
    }

    h4{
        color:#0094ff;
    }

    .mui-grid-view.mui-grid-9{
        background-color: #fff;
    }

    .mui-grid-view.mui-grid-9 .mui-table-view-cell{
        border: none;
    }
</style>
    
<script>
    import common from '../../common/common.js'

    import subcomment from '../subcomponents/subcomment.vue'
    
    export default {
        data() {
            return {
                photoInfo:{},
                thumbImages:[]
            }
        },
        created() {
            this.getPhotoInfoData()
            this.getThumbImagesData()
        },
        methods: {
            //获取图片详情的数据
            getPhotoInfoData(){
                const url = common.apihost + "api/getimageInfo/"+this.$route.params.photoId

                this.$http.get(url).then(res=>{
                    this.photoInfo = res.body.message[0]
                })
            },
            //获取图片详情中的缩略图数据
            getThumbImagesData(){
                const url = common.apihost+"api/getthumimages/"+this.$route.params.photoId

                this.$http.get(url).then(res=>{
                    res.body.message.forEach(item=>{
                        item.w = 600
                        item.h = 400
                    })
                    this.thumbImages = res.body.message
                })
            }
        },
        components:{
            subcomment
        }
    }
</script>