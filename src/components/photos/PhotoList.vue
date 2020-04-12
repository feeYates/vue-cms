<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
			<div class="mui-scroll">
				<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
					{{item.title}}
				</a>
			</div>
		</div>

		<!-- 图片列表区域 -->
		<ul class="photo-list">
			<router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
				<img v-lazy="item.img_url">
				<div class="info">
					<div class="info-title">
                        <h1>{{ item.title }}</h1>
					</div>
					<div class="info-body">{{ item.zhaiyao }}</div>
				</div>
			</router-link>
		</ul>

    </div>
</template>

<script>
// 1. 导入 mui 的组件
import mui from '../../lib/mui/js/mui.min.js'
// 2. 初始化滑动控件
mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});

export default {
    data(){
        return {
			cates: [], //所有分类列表数组
			list: [], // 图片列表的数组
		}
	},
	created(){
		this.getAllCategory();
		// 默认进入页面， 就主动请求 所有图片列表的数据
		this.getPhotoListByCateId(0);
	},
	mounted() { 
		// 当 组件中的DOM结构被渲染好并放到页面中后，会执行这个 钩子函数
		// 如果要操作元素了，最好在 mounted 里面，因为，这时候的 DOM 元素 是最新的
		// 2. 初始化滑动控件
		mui('.mui-scroll-wrapper').scroll({
			deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		});
	},
    methods: {
		getAllCategory(){
			// 获取所有的图片分类
			this.$http.get('getimgcategory').then(result =>{
				if(result.status === 200){
					// 手动拼接处一个最完整的 分类列表
					result.body.unshift({ id: 0, title: '全部'});
					//console.log(result.body.title)
					this.cates = result.body;
				}
			})
		},
		getPhotoListByCateId(cateId){
			// 根据 分类id 获取 图片列表
			this.$http.get('getimages/' + cateId).then(result =>{
				if(result.status === 200){
					this.list = result.body.message;
					console.log(result.body.message)
				}
			})
		}

	}
    
};
</script>

<style lang="scss" scoped>
* {
    touch-action: pan-y;
}

.photo-list{
	list-style: none;
	margin: 0;
	padding: 10px;
	padding-bottom: 0;
	li{
	  background-color: #ccc;
	  text-align: center;
	  margin-bottom: 10px;
	  box-shadow: 0 0 9px #999;
	  position: relative;
	  img{
		  width: 100%;
		  vertical-align: middle;
	  }
	  img[lazy=loading] {
		width: 40px;
		height: 300px;
		margin: auto;
		} 

	  .info{
		  color: #fff;
		  text-align: left;
		  position: absolute;
		  bottom: 0;
          background-color:rgba(0,0,0,0.4);
		  max-height: 84px;
		  .info-title {
			h1{
				font-size: 14px
			}
		  }
		  .info-body {
			font-size: 13px;
		  }
	  }	
	}
}


</style>