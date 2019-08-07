<template>
    <div class="class">
        <h1>分类列表</h1>
        <el-table :data="items">
        <el-table-column prop="id" label="ID" width="220">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
      </el-table>
    </div>
</template>
<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    methods: {
        async fetch(){
            //const res = await this.$http.
        }
    },
    created(){

    }
}
</script>