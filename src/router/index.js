import { createRouter, createWebHashHistory } from 'vue-router'

import index from './../pages/index/index.vue'
import utils from './../pages/utils/index.vue'
import test from './../pages/test/index.vue'
import preview from './../pages/post/preview.vue'

import direction from './../pages/direction/index.vue'
import preview_edit from './../pages/post/preview_edit.vue'
import lib from './../pages/lib/index.vue'
import post from '../pages/post/space.vue'
import space from '../pages/post/space.vue'
import login from '../pages/post/login.vue'
import user from '../pages/user/index.vue'
import error from './../pages/error/index.vue'

const routes = [
    {    path: '/',    name: '/',    component: index  },
    {    path: '/index',    name: 'index',    component: index  },
    {    path: '/utils',    name: 'utils',    component: utils  },
    {    path: '/test',    name: 'test',    component: utils  },
    {    path: '/user',    name: 'user',    component: user  },
    {    path: '/test',    name: 'test',    component: test  },
    {    path: '/preview/:id',    name: 'preview',    component: preview  },

    {    path: '/direction',    name: 'direction',    component: direction  },
    {    path: '/space/:id?',    name: 'space',    component: space  },
    {    path: '/preview_edit',    name: 'preview_edit',    component: preview_edit  },
    {    path: '/lib',    name: 'lib',    component: lib  },
    {    path: '/post/:id',    name: 'post',    component: post  },
    {    path: '/login',    name: 'login',    component: login  },
    {    path: '/:pathMatch(.*)*',   name: 'error',    component: error  },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router