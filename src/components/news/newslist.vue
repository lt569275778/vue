<template>
  <div class="tmpl">
        <div class="mui-content">
            <ul class="mui-table-view">
				<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/news/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
                            <p class="titleStyle">
							    {{item.title}}
                            </p>
							<p class='mui-ellipsis'>
                                <span>
                                    {{item.add_time | dateFmt("YYYY-MM-DD HH:mm")}}
                                </span>

                                <span class="mui-pull-right">
                                    点击{{item.click}}次
                                </span>
                            </p>
						</div>
					</router-link>
				</li>
			</ul>
        </div>
  </div>
</template>

<style scoped>
    .mui-table-view .mui-media, .mui-table-view .mui-media-body{
        height: 80px;
    }

    .mui-table-view .mui-media-object.mui-pull-left{
        height: 64px;
        min-width: 64px;
    }

    .titleStyle{
        font-size: 14px;
        color: gray;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .mui-ellipsis{
        margin-top: 20px;
        font-size: 12px;
        color: #0094ff;
    }
</style>


<script>
    //导入我们公共.js文件
    import common from '../../common/common.js'

    export default{
        data(){
            return {
                newsList:[]
            }
        },
        created(){
            this.getNewsListData()
            console.log("----newlist create----")
        },
        methods:{
            getNewsListData(){
                const url = common.apihost+"api/getnewslist"

                this.$http.get(url).then(response=>{
                    this.newsList = response.body.message
                })
            }
        }
    }
</script>
