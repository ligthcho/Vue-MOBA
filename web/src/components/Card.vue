<template>
  <div class="card bg-white p-3 mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu1"></i>
    </div>
    <div class="card-body pt-3">
        <!-- 插槽 使外部div里插入html-->
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
    props:{//required 必填
        title:{type:String,required:true},
        icon:{type:String,required:true},
    }
}
</script>
<style lang="scss">
@import "../assets/scss/variables";
    .card{
        .card-header{
            border-bottom: 1px solid $border-color;
        }
        border-bottom: 1px solid $border-color;
    }
</style>