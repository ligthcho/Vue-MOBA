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
    <m-list-card icon="menu" title="新闻资讯" :categories="newsCats">
      <!-- 这里是父组件传值给子组件 emmm有点绕 -->
      <template #items="{category}">
        <div>
          <div class="py-2 fs-lg d-flex" v-for="(news,i) in category.newsList" :key="i">
            <span class="text-info">[{{news.categoryName}}]</span>
            <span class="px-2">|</span>
            <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
            <span class="text-grey-1 fs-sm">{{news.createdAt|date}}</span>
          </div>
        </div>
      </template>
    </m-list-card>
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 这里是父组件传值给子组件 emmm有点绕 -->
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem">
          <div class="p-2 text-center" style="width:20%;" v-for="(hero,i) in category.heroList" :key="i">            
            <img :src="hero.avatar" class="w-100"/>
            <div>{{hero.name}}</div>
          </div>
        </div>
      </template>
    </m-list-card>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      heroCats:[],
    };
  },
  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCats(){
      const res = await this.$http.get('heroes/list')
      this.heroCats = res.data
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroCats();
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