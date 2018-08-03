import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Employment from '@/components/employment'
import Admission from '@/components/admission'
import ProfessionItem from '@/components/profession-item'
import NewsItem from '@/components/news-item'
import UserCenter from '@/components/userCenter'
import UserDetail from '@/components/userDetail'
import Login from '@/components/login'
import Register from '@/components/register'
import CollegeInfo from '@/components/collegeInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/collegeInfo',
      name: 'collegeInfo',
      component: CollegeInfo
    },
    {
      path: '/employment',
      name: 'employment',
      component: Employment
    },
    {
      path: '/admission',
      name: 'admission',
      component: Admission
    },
    {
      path: '/profession',
      name: 'professionItem',
      component: ProfessionItem
    },
    {
      path: '/news',
      name: 'newsItem',
      component: NewsItem
    },
    {
      path: '/userCenter',
      name: 'userCenter',
      component: UserCenter,
      children: [
        {
          path: 'login',
          name: 'login',
          component: Login
        },
        {
          path: 'register',
          name: 'register',
          component: Register
        },
        {
          path: ':id',
          name: 'userDetail',
          component: UserDetail
        }
      ]
    }
  ]
})
