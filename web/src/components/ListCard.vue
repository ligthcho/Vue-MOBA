<template>
  <m-card :icon="icon" :title="title">
    <div class="nav jc-between">
      <!-- $refs.list.swiper.slideTo || 轮播图跳转到i  -->
      <div
        class="nav-item"
        :class="{active:active === i}"
        v-for="(category,i) in categories"
        :key="i"
        @click="$refs.list.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>
    <div class="pt-3">
      <!-- ref || 相当于Html里面的id -->
      <!-- slide-change || 轮播图切换事件 -->
      <!-- $refs.list.swiper.realIndex || 轮播图当前id -->
      <swiper ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
        <!-- 幻灯片循环 -->
        <swiper-slide v-for="(category,i) in categories" :key="i">
          <slot name="items" :category="category"></slot>

          <!-- <div class="py-2" v-for="n in 5" :key="n">
            <span>[新闻]</span>
            <span>|</span>
            <span>{{i}}夏日新版本“星之队”即将6月上线</span>
            <span>06/02</span>
          </div>-->
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>
<script>

export default {
  data() {
    return {
      active: 0
    };
  },
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    categories: { type: Array, required: true }
  }
};
</script>