<template>
   <div>
        <!-- 1.0 提交评论区域 -->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <div>
                <textarea ref="textAreaRef" placeholder="请输入评论内容..." name="" cols="30" rows="5">

                </textarea>
                <mt-button @click="postComment" size="large" type="primary">提交评论</mt-button>
            </div>
        </div>

        <!-- 2.0 展示评论区域(评论列表&加载更多) -->
        <div class="commentListStyle">
            <h4>提交列表</h4>
            <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
                <p class="commentItemTitleStyle">{{item.content}}</p>
                <p class="commentItemUserAndTimeStyle">
                    <span class="left">
                        {{item.user_name}}
                    </span>
                    <span class="right">
                        {{item.add_item | dateFmt}}
                    </span>
                </p>
            </div>
            <mt-button @click="loadMore" class="loadMoreStyle" size="large" plain type="danger">加载更多</mt-button>
        </div>
   </div>
</template>
    
<style scoped>
    .postCommentStyle,.commentListStyle{
        padding: 6px;
    }

    h4{
        padding: 5px 5px 10px 5px;
        border-bottom: 1px solid rgba(92,92,92,0.4);
    }

    .commentItemStyle{
        padding: 5px;
        border-bottom: 1px solid rgba(92,92,92,0.4);
    }

    .loadMoreStyle{
        margin-top: 15px;
    }
    
    .commentItemTitleStyle{
        color: black;
    }

    .commentItemUserAndTimeStyle{
        margin-top: 10px;
        max-height: 70px;
        overflow-y: auto;
        font-size: 12px;
        color: #0094ff;
    }

    .left{
        float: left;
        width: 50%;
    }

    .right{
        float: right;
    }
</style>
    
<script>
    import common from '../../common/common.js'

    //import $ from 'jquery'

    import { Toast } from 'mint-ui'
    
    export default {
        data() {
            return {
                pageIndex : 1,
                commentList : []
            }
        },
        created() {
            this.getCommentListDataByPageIndex()
            console.log("-----created----")
        },
        updated(){
            console.log("-----update----")
        },
        destroyed(){
            console.log("-----destroyed----")
        },
        methods: {
            getCommentListDataByPageIndex(){
                const url = common.apihost+"api/getcomments/"+this.commentId+"?pageindex="+this.pageIndex

                this.$http.get(url).then(res=>{
                    if(this.pageIndex==1){//加载第一页
                        this.commentList = res.body.message
                    }else{//加载非第一页
                        this.commentList = this.commentList.concat(res.body.message)
                    }
                })
            },
            //加载更多
            loadMore(){
                this.pageIndex++
                this.getCommentListDataByPageIndex()
            },
            //提交评论
            postComment(){
                //1.获取textarea中的值
                const content = this.$refs.textAreaRef.value

                if(content==null || content.trim().length<=0){
                    Toast({
                        message: '请输入评论内容',
                        position: 'middle',
                        duration: 3000
                    })
                }

                //2.发送网络请求
                const url = common.apihost+"api/postcomment/"+this.commentId

                this.$http.post(url,{content:content},{emulateJSON:true}).then(res=>{
                    Toast({
                        message: res.body.message,
                        position: 'middle',
                        duration: 3000
                    })

                    //清空原先写的内容
                    this.$refs.textAreaRef.value=''

                    //重新加载第一页的数据
                    this.pageIndex = 1
                    this.getCommentListDataByPageIndex()
                })
            }
        },
        //子组件只需要这样写，父组件就可以通过commentId给子组件传递值了
        props:['commentId']
    }
</script>