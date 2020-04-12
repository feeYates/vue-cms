<template>
    <div class="photoinfo-container">
        <h3 class="photoinfo-title">{{ photoinfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ photoinfo.add_time }}</span>
            <span>点击次数：{{ photoinfo.click }}次</span>
        </p>

        <hr>

        <!-- 缩略图区域 -->
        <!-- <img class="preview-img" v-for="(item, index) in list" :src="item.src" height="100" @click="$preview.open(index, list)" :key="item.src">  -->
        <div class="thumbs">
              <vue-preview :slides="list" class="imgPre"></vue-preview>
        </div>
       

        <!-- 图片内容区域 -->
        <div class="content" v-html="photoinfo.content">

        </div>
        <!-- 放置一个现成的评论子组件  -->
        <cmt-box :id="id"></cmt-box>
    </div>
</template>

<script>
// 1. 导入评论子组件
import comment from '../subcomponents/comment.vue'

export default {
  data(){
      return{
          id: this.$route.params.id, // 从路由中获取到的 图片id
          photoinfo: [], // 图片详情
          list: []
      };
  },
  created(){
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
      getPhotoInfo(){
        // 获取 图片的详情
        this.$http.get('getimageInfo/' + this.id).then(result =>{
            if(result.status === 200){
               //console.log(result.body)
               this.photoinfo = result.body
            } 
        })
      },
      getThumbs(){
        // 获取缩略图
        this.$http.get('getthumimages/' + this.id).then(result =>{
            if(result.status === 200){
                //console.log(result.body.message)
                // 循环每个图片的数据，补全图片的宽和高
                result.body.message.forEach(item =>{
                    item.w = 600;
                    item.h = 400;
                    item.src = item.src;
                    item.msrc = item.src;
                });
                // 把完成的数据保存到 list 中 
                this.list = result.body.message;
            }
        })
      }
  },
  components:{ // 注册评论子组件件
      'cmt-box': comment
  }
}
</script>

<style lang="scss">
.photoinfo-container{
    padding: 3px;
    .photoinfo-title{
        color: #26A2FF;
        font-size: 14px;
        text-align: center;
        margin: 15px 0;
    }
    .subtitle{
        display: flex;
        justify-content: space-between;
        font-size: 13px;
    }

    .content{
        font-size: 13px;
        line-height: 30px;
    }
    .thumbs{
        .imgPre{
            .my-gallery{
                figure{
                  display: inline-block;
                  margin: 8px;
            }
            img{
                width: 90px;
                height: 70px;
                box-shadow: 0 0 8px #999;
                margin: 2px
                }
            }
        }
    }
}
</style>