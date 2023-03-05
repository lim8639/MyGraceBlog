import { createRouter, createWebHashHistory } from 'vue-router'

import index from './../pages/index/index.vue'
import utils from './../pages/utils/index.vue'
import preview from './../pages/post/previewer.vue'
import preview_for_yygzt from './../pages/post/preview_for_yygzt.vue'
import direction from './../pages/direction/index.vue'
import preview_edit from './../pages/post/preview_edit.vue'
import lib from './../pages/lib/index.vue'
import user from './../pages/user/index.vue'
import error from './../pages/error/index.vue'

const routes = [
    {    path: '/',    name: '/',    component: index  },
    {    path: '/index',    name: 'index',    component: index  },
    {    path: '/utils',    name: 'utils',    component: utils  },
    {    path: '/preview/:id',    name: 'preview',    component: preview  },
    {    path: '/preview_for_yygzt/:id',    name: 'preview_for_yygzt',    component: preview_for_yygzt  },
    {    path: '/direction',    name: 'direction',    component: direction  },
    {    path: '/preview_edit',    name: 'preview_edit',    component: preview_edit  },
    {    path: '/lib',    name: 'lib',    component: lib  },
    {    path: '/user',    name: 'user',    component: user  },
    {    path: '/:pathMatch(.*)*',   name: 'error',    component: error  },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router