<template>
  <div class="about">
    <h1>{{id?'修改':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <!-- <el-form-item label="上级分类">
                <el-select v-model="model.parent" >
                    <el-option v-for="item in perents" :key="item._id" :value="item._id" :label="item.name"></el-option>
                </el-select>
      </el-form-item>-->
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item of categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.difficult"></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.skills"></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.attack"></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate style="margin-top:0.6rem" :max="9" show-score v-model="model.scores.survive"></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple>
          <el-option
            v-for="item of items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple>
          <el-option
            v-for="item of items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
       <el-form-item label="使用技巧">
        <el-input  type="textarea" v-model="model.usageTips"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input  type="textarea" v-model="model.battleTips"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input  type="textarea" v-model="model.teamTips"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    //接受路由参数
    id: {}
  },
  data() {
    return {
      categories:[],
      items:[],
      model: {
        name:'',
        avatar:'',
        scores:{
          difficult:0
        }
      }
    };
  },
  methods: {
      afterUpload(res){
          //显式赋值  为什么用这个 因为没有先在上面Model定义后来加model数据可能加不上
          //this.$set(this.model,'avatar',res.url)
          this.model.avatar = res.url //上面定义了字段就可以不用显式赋值
      },
    async save() {
      //同步
      if (this.id) {
        //修改保存
        await this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        //新增保存
        await this.$http.post("rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      this.model = Object.assign({},this.model,res.data);//合并数组 避免覆盖原设定Model
    },
    async fetchCategories(){//取出分类列表
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data;
    },
    async fetchItems(){//取出装备列表
      const res = await this.$http.get(`rest/items`)
      this.items = res.data;
    }
  },
  created() {
    this.fetchItems();
    this.fetchCategories()
    this.id && this.fetch();
  }
};
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
