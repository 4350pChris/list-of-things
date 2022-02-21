import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: { icon: 'mdi-home', title: 'Home', nav: true }
  },
  {
    path: '/books',
    name: 'books',
    redirect: { name: 'book-lists' },
    components: {
      default: () => import(/* webpackChunkName: "movies" */ '../views/books/Index.vue'),
      extension: () => import(/* webpackChunkName: "movies" */ '../views/books/NavExtension.vue')
    },
    meta: { icon: 'mdi-book-open-variant', title: 'Books', nav: true },
    children: [
      {
        path: 'lists',
        name: 'book-lists',
        component: () => import(/* webpackChunkName: "movies" */ '../views/books/Lists.vue')
      },
      {
        path: 'lists/:id',
        name: 'book-detail-list',
        component: () => import(/* webpackChunkName: "movies" */ '../views/books/DetailList.vue'),
        props: route => ({ value: route.params.id })
      }
    ]
  },
  {
    path: '/movies',
    name: 'movies',
    redirect: { name: 'movie-lists' },
    components: {
      default: () => import(/* webpackChunkName: "movies" */ '../views/movies/Index.vue'),
      extension: () => import(/* webpackChunkName: "movies" */ '../views/movies/NavExtension.vue')
    },
    beforeEnter(to, from, next) {
      if (!store.state.auth?.tmdb && to.name !== 'link-tmdb') {
        next({ name: 'link-tmdb' })
      } else {
        next()
      }
    },
    meta: { icon: 'mdi-movie-open-outline', title: 'Movies', nav: true },
    children: [
      {
        path: 'lists',
        name: 'movie-lists',
        component: () => import(/* webpackChunkName: "movies" */ '../views/movies/Lists.vue')
      },
      {
        path: 'lists/:id',
        name: 'movie-detail-list',
        component: () => import(/* webpackChunkName: "movies" */ '../views/movies/DetailList.vue'),
        props: route => ({ id: Number(route.params.id) })
      }
    ]
  },
  {
    path: '/link-tmdb',
    name: 'link-tmdb',
    component: () => import(/* webpackChunkName: "movies" */ '../views/movies/LinkTmdb.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue'),
    beforeEnter(to, from, next) {
      if (store.state.user !== null) {
        next(false)
      } else {
        next()
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
