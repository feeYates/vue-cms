<template>
    <div class="appContainer">
    <!-- 顶部 Header 区域 -->
    <mt-header fixed title="凌云草商城">
      <span slot="left" @click="goBack" v-show="flag">
        <mt-button icon="back">返回</mt-button>
      </span>
    </mt-header>
     
    <!-- 中间的 路由 router-view 区域 -->
    <transition>
       <router-view></router-view> 
    </transition>
    

    <!-- 底部 Tabbar 区域 -->
    <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item-ye" to="/home">
            <span class="mui-icon mui-icon-home"></span>
            <span class="mui-tab-label">首页</span>
        </router-link>
        <router-link class="mui-tab-item-ye" to="/member">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">会员</span>
        </router-link>
        <router-link class="mui-tab-item-ye" to="/shopcar">
            <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                <span class="mui-badge" id="badge">{{ $store.getters.getAllCount }}</span>
            </span>
            <span class="mui-tab-label">购物车</span>
        </router-link>
        <router-link class="mui-tab-item-ye" to="/search">
            <span class="mui-icon mui-icon-search"></span>
            <span class="mui-tab-label">搜索</span>
        </router-link>
	</nav>

    </div> 
</template>

<script>
export default {
    data() {
        return {
            flag: false
        }
    },
    created (){
       this.flag = this.$route.path === '/home'? false : true
    },
    methods: {
        goBack() { //点击后退
            this.$router.go(-1)
        }
    },
    watch: {
        '$route.path':function(newVal){
            if(newVal === '/home'){
                this.flag = false
            }else{
                this.flag = true
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-header{
   z-index: 99;
}
.appContainer{
    padding-top: 40px;
    padding-bottom: 50px;
    overflow-x: hidden;
}

.v-enter{
    opacity:0;
    transfrom: transitionX(100%);
}
.v-leave-to{
    opacity:0;
    transfrom: transitionX(-100%);
    position: absolute
}

.v-enter-active,
.v-leave-active{
   transition: all 0.5s ease;
   
}

// 改类名 解决tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-ye.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-ye {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-ye .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-ye .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
