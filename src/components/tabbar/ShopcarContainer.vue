<template>
    <div class="shopcar-container">
        <div class="goods-list">
            
            <!-- 商品列表项区域 -->
            <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thumb_path" alt="">
					   
                        <div class="info">
                            <h1>{{ item.title }}</h1>
                            <p>
                                <span class="price">￥{{ item.sell_price }}</span>
                                <!-- 问题：如何从购物车中获取商品的数量呢 -->
                                <!-- 1. 我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把  当前循环这条商品的 Id，作为 对象的 属性名，count值作为 对象的 属性值，这样，当把所有商品循一遍，就会得到一个对象 { 88:2 ,89:1, 90:4} -->
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                            </p>
                        </div>
                    
                    </div>
				</div>
		    </div>

            <!-- 结算区域 -->
            <!-- <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 0 件，总价 ￥0</p>
                        </div>
                         <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
		    </div> -->

            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
						<div class="js_left">
                            <p>总计(不含运费)</p>
                            <p>已勾选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件，总价 ￥<span class="red">{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
                        </div>
                        <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>

        </div>

    </div>
</template>

<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data() {
        return {
            goodslist: [],// 购物车中所有商品的数据
            id: 1
        }
    },
    created() {
       this.getGoodsList();
    },
    methods: {
       getGoodsList() {
           // 1. 获取到 store 中所有的商品的Id，然后拼接出一个用逗号分隔的字符串
           var idArr = []
           this.$store.state.car.forEach(item=>idArr.push(item.id)); 
           // 如果 购物车中没有商品，则直接返回，不需要请求接口，否则会报错
           if (idArr.length <= 0){
               return;
           }
           //获取购物车商品列表
        this.$http.get("getshopcarlist").then(result =>{
           if(result.status === 200 ){
              this.goodslist = result.body;
           }
        })
           
       },

       remove(id,index){
            // 点击删除，把商品从 store 中根据传递的 Id 删除，同时，把组件当中的 goodslist 中，对应删除的那个商品，使用 index 来删除
            this.goodslist.splice(index, 1);
            this.$store.commit('removeFormCar', id);
       },
       selectedChanged(id, val) {
            // 每当点击开关，把最新的 开关状态，同步到 store 中
            // console.log( id +'---'+ val)
            this.$store.commit('updateGoodsSelected', {id, selected: val })
       }
    },
   components: {
       numbox
   }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;

    .goods-list{
        .mui-card-content-inner{
            display: flex;
            align-items: center;
        }
        img{
            width: 60px;
            height: 60px;
        }
        h1{
            font-size: 14px;
        }
        .info{
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            a{
                font-size: 13px;
            }
            .price{
                color: red;
                font-weight: bold;
            }
        }
    }
    .mui-card-content-inner{
        width: 341px;
    }
    .jiesuan{
        display: flex;
        justify-content: space-between;
        align-item: center;
        
        .red{
            color: red;
            font-weight: bold;
            font-size: 16px;
        }

    }
    
}
</style>