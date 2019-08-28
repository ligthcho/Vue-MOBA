<template>
    <div>
        <!-- 左中右布局 垂直居中 -->
        <div class="topbar bg-black py-2 px-3 d-flex ai-center"> 
            <img src="../assets/logo.png" height="30" alt="" srcset="">
            <!-- 加flex-1把右边撑开 -->
            <div class="px-2 flex-1">
                <div class="text-white">王者荣耀</div>
                <div class="text-grey-1 fs-xxs">团队成就更多</div>
            </div>
            <button type="button" class="btn bg-primary">立即下载</button>
        </div>
        <div class="bg-primary pt-3 pb-2">
            <!-- 左右有边距用jc-around  没有边距就用between -->
            <div class="nav nav-inverse pb-1 jc-around">
                <div class="nav-item active">
                    <!-- 这里tag改成div就不用重置a链接样式 -->
                    <router-link class="nav-link" tag="div" to="/">首页</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
                </div>
                <div class="nav-item">
                    <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .topbar{
        position: sticky;//吸顶效果 这个css3最新的手机能支持,兼容性问题去网上搜
        top:0;
        z-index: 999;
    }
</style>