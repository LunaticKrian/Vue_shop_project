import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入组件：
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

const routers =  new VueRouter({
    routes: [
        // 设置路由重定向：
        {path: '/', redirect: 'login'},
        // 配置路由：
        {path: '/login', component: Login},
        {path: '/home', component: Home},

    ]
});

// 挂在路由导航守卫：
routers.beforeEach((to, from, next)=> {
    // 参数解析：1.to：将要访问的路由，2.from：从哪个路由跳转发生跳转；3.next：是一个函数，方向跳转
    if (to.path === '/login') return next();
    // 获取token：
    const tokenStr = window.sessionStorage.getItem("token");
    if (!tokenStr) return next('/login');
    next();
});

export default routers;


