<template>
    <div class="about">
        <h1>新建分类</h1>
        <el-form label-width="120px" @submit.native.prevent="save">
            <el-form-item label="上级分类">
                <el-select v-model="model.parent" >
                    <el-option v-for="item in perents" :key="item._id" :value="item._id" :label="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props:{//接受路由参数
        id:{} 
    },
    data(){
        return {
            model:{},
            perents:[]
        }
    },
    methods:{
        async save(){//同步
             if(this.id){//修改保存
                await this.$http.put(`categories/${this.id}`,this.model)
             }else{//新增保存
                await this.$http.post('categories',this.model)
             }            
             this.$router.push('/categories/list')
             this.$message({
                 type:'success',
                 message:'保存成功'
             })
        },
        async fetch(){
            const res = await this.$http.get(`categories/${this.id}`);
            this.model = res.data
        },
        async fetchPerents(){
            const res = await this.$http.get('categories');
            this.perents = res.data
        }
    },
    created(){
        this.fetchPerents()
        this.id && this.fetch()
    }
}
</script>