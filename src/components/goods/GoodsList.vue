<template>
    <div class="goods-list">  
       <!--  <router-link class="goods-item" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
           <img :src="item.img_url" alt="">
        
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="now">{{ item.sell_price }}</span>
                    <span class="old">{{ item.market_price }}</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </router-link> -->
         
        <!-- 在网页中，有两种跳转方式 -->
        <!-- 方式一：使用 a 标签的形式叫做 标签跳转 -->
        <!-- 方式二： 使用 window.location.href 的形式，叫做 编程式导航-->
        <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
        
            <h1 class="goods-title">{{ item.title }}</h1>
            <div class="goods-info">
                <p class="goods-price">
                    <span class="now">{{ item.sell_price }}￥</span>
                    <span class="old">{{ item.market_price }}￥</span>
                </p>
                <p class="goods-sell">
                    <span>热卖中</span>
                    <span>剩{{ item.stock_quantity }}件</span>
                </p>
            </div>
        </div>  
        <mt-button type="danger" size="large" @click="getmore">加载更多...</mt-button>
    
    
    </div>
    
</template>

<script>
export default {
    data(){
        //  data 是往自己组件内部，挂载一些私有数据的
        return {
            pageIndex: 1, //分页的页数 (由于我们暂时没有，所有不用)
            goodslist: [] //存放商品列表的数组
        }
    },
    created(){
       this.getGoodsList();
    },
    methods: {
        getGoodsList(){
         // 获取商品列表
         this.$http.get('getgoods').then(result =>{
                if(result.status === 200){
                    // console.log(result.body)
                    //console.log(this.goodslist)
                    //this.goodslist = result.body
                    this.goodslist = this.goodslist.concat(result.body);
                }
            })
        },
        getmore(){
            this.$http.get('getmoregoods').then(result =>{
                if(result.status === 200){
                    this.goodslist = this.goodslist.concat(result.body);
                }
            }) 
        },
        goDetail(id){
          //使用js的形式进行路由导航

          // 注意： 一定要区分 this.$route 和 this.router 这两个对象，都属于它
          // 其中：this.$route 是路由【参数对象】，所有路由中的参数， params, query 都属于它
          // 其中：this.$router 思一个【路由对象】，用它 可以方便的 使用 js 代码，使用 实现路由的 前进，后退，跳转到新的 URL 地址
          console.log(this)
          // 1. 最简单的
          // this.$router.push("/home/goodsinfo/" + id);
          // 2. 传递对象
          // this.$router.push({ path: "/home/goodsinfo/" + id })
          // 3. 传递命名的路由
          this.$router.push({ name: 'goodsinfo', params: { id }})
        }

    }
    
}
        
</script>

<style lang="scss" scope>
.goods-list{
    display: flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;

    .goods-item{
       width: 49%;
       border: 1px solid #ccc;
       box-shadow: 0 0 8px #ccc;
       margin: 4px 0;
       padding: 2px;
       display: flex;
       flex-direction: column;
       justify-content: space-between;
       min-height: 220px;

       img{
          width: 100%;
       }
       .goods-title{
           font-size: 14px;
       }

       .goods-info{
           background-color: #eee;
           p{
               margin:0;
               padding: 5px;
           }
           .goods-price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration:line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
           }
           .goods-sell{
                display: flex;
                justify-content: space-between;
                font-size: 13px;
           }
       }
    }
}
</style>