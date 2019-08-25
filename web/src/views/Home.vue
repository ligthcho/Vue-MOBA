<template>
  <div class>
    <!-- start:轮播图 -->
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/53d9b7fee6b6142a0d088c1a6a1595e9.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/486163fd7b5ca847b55d598d54501085.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/537648a74e17ccc1603e154be23f7378.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/c0c7e84119688f779a6c8afd9f9da959.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end:轮播图 -->
    <!-- start:导航菜单 -->
    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        收起
      </div>
    </div>
    <!-- end:导航菜单 -->
    <m-card icon="menu" title="新闻资讯">
      <div class="nav jc-between">
        <div class="nav-item active">
          <div class="nav-link">热门</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">新闻</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">公告</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">活动</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">赛事</div>
        </div>
      </div>
      <div class="pt-3">
        <swiper>
          <swiper-slide v-for="m in 5" :key="m">
            <div class="py-2" v-for="n in 5" :key="n">
              <span>[新闻]</span>
              <span>|</span>
              <span>{{m}}夏日新版本“星之队”即将6月上线</span>
              <span>06/02</span>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </m-card>
    <m-card icon="menu" title="英雄列表"></m-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      }
    };
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1; //不要透明
    border-radius: 0.1538rem; //2px
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "info");
    }
  }
}
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      //4的倍数 那项不加边框
      border-left: none;
    }
  }
}
</style>