<template>
  <div class="about">
    <h1>{{id?'修改':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :value="item._id"
            :label="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor useCustomImageHandler @imageAdded="handleImageAdded" v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  props: {
    //接受路由参数
    id: {}
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  components: {
    VueEditor
  },
  methods: {
    async save() {
      //同步
      if (this.id) {
        //修改保存
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        //新增保存
        await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCategories() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {//文本编辑器 改造自定义上传图片方式
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("upload", formData); //请求后台上传文件地址
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.fetchCategories();
    this.id && this.fetch();
  }
};
</script>