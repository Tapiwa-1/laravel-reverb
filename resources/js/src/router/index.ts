import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    // http://127.0.0.1:8000/app
    history: createWebHistory("/app"),
    routes: [
        {
            path:'/register',
            name:"register",
            component: ()=> import('../pages/Auth/AuthPage.vue'),
            children:[
                {
                    path:'/register',
                    name:"register",
                    component: ()=> import('../pages/Auth/RegisterPage.vue')
                },
                {
                    path:'/login',
                    name:"login",
                    component: ()=> import('../pages/Auth/LoginPage.vue')
                }
            ]
        }
    ]
})

export default router;