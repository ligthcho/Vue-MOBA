import Vue from 'vue'
import Router from 'vue-router'

import Main from './views/Main.vue'
//分类
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
//物品
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {path:'/categories/create',component:CategoryEdit},
        {path:'/categories/edit/:id',component:CategoryEdit,props:true},
        {path:'/categories/list',component:CategoryList},
        {path:'/items/create',component:ItemEdit},
        {path:'/items/edit/:id',component:ItemEdit,props:true},
        {path:'/items/list',component:ItemList}
      ]
    }
  ]
})
