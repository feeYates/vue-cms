<template>
    <div class="goodsinfo-container">
        
        <transition
        @before-enter="beforeEnter"
        @enter="Enter"
        @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        
        <!-- 商品轮播图区域 -->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                   <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
                </div>
            </div>
        </div>
         
        
        <!-- 商品购买区域 -->
        <div class="mui-card">
            <div class="mui-card-header">{{ goodsinfo.title }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价格:<del>￥{{ goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价: <span class="now_price">￥{{ goodsinfo.sell_price }}</span>
                    </p>
                    <p>购买数量：<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    <!-- 分析： 如何实现加入购物车适合，拿到 选择的数据 -->
                    <!-- 1. 经过分析发现: 按钮属于 goodsinfo 页面，数字 属于 numberbox 组件 -->
                    <!-- 2. 由于涉及到父子组件的嵌套了，所以，无法直接在 goodsinfo 页面中获取到 选择的商品数量值 -->
                    <!-- 3. 怎么解决这个问题：涉及到了 子组件向父组件传值了（事件调用机制） -->
                    <!-- 4. 事件调用的本质： 父向子传递方法 -->
                    
                    
                    
                    </p>
                </div>
            </div>
        </div>


        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号: {{ goodsinfo.goods_no }}</p>
                    <p>库存情况: {{ goodsinfo.stock_quantity }}件</p>
                    <p>上架时间: {{ goodsinfo.add_time | dataFormat }}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
// 导入轮播图组件
import swiper from '../subcomponents/swiper.vue';
import numbox from '../subcomponents/goodsinfo_numbox.vue';

export default {
    data(){
        return{
            id: this.$route.params.id ,//将路由参数对象中的 id 挂载到 data, 方便后期调用
            lunbotu: [], //轮播图的数据
            goodsinfo: {}, // 获取到的商品信息
            ballFlag: false, //控制小球隐藏和显示的标识
            selectedCount: 1 // 保存用户选中的商品数量，默认，认为用户买一个
        }
    },
    created (){
        this.getLunbotu();
        this.getgoodsinfo();
    },
    methods: {
        getLunbotu() {
            this.$http.get('getgoodsinfothumimages/' + this.id ).then(result =>{
                if(result.status === 200){
                    //先循环轮播图数组的每一项，为item 添加 img 属性，因为 轮播图 组件中，只认识item.img，不认识 item.src
                    result.body.message.forEach(item=>{
                        item.imglink = item.src;
                    })
                    this.lunbotu = result.body.message;
                    //console.log(this.lunbotu)
                }
            })
        },
        getgoodsinfo() {
           // 获取商品的信息
           this.$http.get('getgoodsinfo/' + this.id).then(result =>{
               if(result.status === 200){
                   this.goodsinfo = result.body;
                   //console.log(this.goodsinfo)
               }
           })
        },
        goDesc(id) {
            //点击使用编程式导航跳转到 图文介绍
            this.$router.push({ name: "goodsdesc", params: { id }})

        },
        goComment(id) {
            //点击使用编程式导航跳转到 商品评论
             this.$router.push({ name: "goodscomment", params: { id }})

        },
        addToShopCar() {
            // 添加到购物车
            this.ballFlag = !this.ballFlag
            // { id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: false}
            // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
            var goodsinfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected:true };
            // 调用 store 中的 mutations 来将商品加入购物车
            this.$store.commit('addToCar', goodsinfo);
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)"
        },
        Enter(el, done) {
            el.offsetWidth


            // 小球动画优化思路
            // 1. 先分析导致 动画 不准确的本质原因：我们把 小球 最终 位移到的位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            // 2. 只要分辨率 和 测试的时候不一样，或者滚动条有一定的滚动距离之后，问题就出现了；
            // 3. 因此，我们经过分析 得到结论： 不能把位置的 横纵 坐标直接写死了， 而是 应该 根据不同的情况，动态的计算这个坐标值；
            // 4. 经过分析，得出解题思路：先得到 徽标的 横纵坐标，然后 让 y值 求差， x 值也求差, 得到 的结果，就是横纵坐标要位置的距离
            // 5. 如何获取 徽标和小球  的位置 domObjec.getBoundingClientRect()
            

            //  获取在页面中的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //  获取 徽标 在页面中的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)"
            done();
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag;
        },
        getSelectedCount(count) {
            // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
            this.selectedCount = count;
            console.log('父组件拿到的数量的值为:' + this.selectedCount)
        }
    },
    components: {
        swiper,
        numbox
    }
}
</script>

<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .now_price{
      color:red;
      font-size: 16px;
      font-weight: bold;
    }
    .mui-numbox{
        height: 30px;
    }

    .mui-card-footer{
        display: block;
        button{
           margin: 15px 0; 
        }
    }

    .ball{
         width: 15px;
         height: 15px;
         border-radius: 50%;
         background-color: red;
         position: absolute;
         z-index: 99;
         top: 405px;
         left: 146px;
    }
}

</style>