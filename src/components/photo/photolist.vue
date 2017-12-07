<template>
   <div class='tmpl'>
        <!-- 1.0 图片分类 -->
        <div class="photoCategoryStyle">
            <ul>
                <li @click="getPhotoListByCategoryId(0)">全 部</li>
                <li @click="getPhotoListByCategoryId(item.id)" v-for="item in categoryArray" :key="item.id">
                    {{item.title}}
                </li>
            </ul>
        </div>

        <!-- 2.0 图片列表 -->
        <div class="photoListStyle">
            <ul>
                <li v-for="item in photoList" :key="item.id">
                    <router-link :to="'/photo/photoinfo/'+item.id">
                        <img :src="item.img_url">
                        <p class="titleAndSummaryStyle">
                            <span>{{item.title}}</span><br/>
                            {{item.zhaiyao}}
                        </p>
                    </router-link>
                </li>
            </ul>
        </div>
   </div>
</template>
    
<style scoped>
    /* 1.0 图片分类的样式 */
    .photoCategoryStyle{
        overflow-x: auto;
    }

    .photoCategoryStyle ul{
        padding: 0px 0px 15px 0px;
        white-space: nowrap;
        margin: 5px 0px;
    }

    .photoCategoryStyle li{
        list-style: none;
        display: inline;
        color: #0094ff;
        margin: 0px 3px;
    }

    /* 2.0 图片列表的样式 */
    .photoListStyle ul{
        margin: 3px 0px;
        padding: 0 3px;
    }

    .photoListStyle li{
        list-style: none;
        position: relative;
    }

    img{
        width: 99%;
        height: 400px;
    }

    .titleAndSummaryStyle{
        position: absolute;
        left:5px;
        right: 5px;
        bottom: 0px;
        color: #fff;
        background-color: rgba(0,0,0,0.2);
    }

    .titleAndSummaryStyle span{
        font-size: 16px;
        font-weight: 900;
    }
</style>
    
<script>
    import common from '../../common/common.js'

    import { Indicator } from 'mint-ui'
    
    export default {
        data() {
            return {
                categoryArray:[],
                photoList:[]
            }
        },
        created() {
            this.getPhotoCategoryData()
            this.getPhotoListByCategoryId(0)
        },
        methods: {
            //获取图片分类的数据
            getPhotoCategoryData(){
                const url = common.apihost+"api/getimgcategory"

                this.$http.get(url).then(res=>{
                    this.categoryArray = res.body.message
                })
            },
            //获取我们每个分类id下面具体图片列表数据
            getPhotoListByCategoryId(id){
                const url = common.apihost+"api/getimages/"+id

                Indicator.open({
                    text: '加载中...',
                    spinnerType: 'triple-bounce'
                })

                this.$http.get(url).then(res=>{
                    Indicator.close()
                    this.photoList = res.body.message
                },err=>{
                    Indicator.close()
                })
            }
        }
    }
</script>