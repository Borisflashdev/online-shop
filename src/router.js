import { createRouter, createWebHistory } from 'vue-router';
import store from './index.js';

import HomePage from './pages/HomePage.vue';
import AboutUsPage from './pages/AboutUsPage.vue';
import LoginPage from './pages/LoginPage.vue';
import SignupPage from './pages/SignupPage.vue';
import ProductPage from './pages/ProductPage.vue';
import CartPage from './pages/CartPage.vue';
import NotFoundPage from './pages/NotFoundPage.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home/1', props: true },
        { path: '/home/:page', component: HomePage, props: true },
        { path: '/aboutus', component: AboutUsPage, props: true },
        { path: '/product/:productId', component: ProductPage, props: true },
        { path: '/login', component: LoginPage, props: true, meta: { requiresUnauth: true } },
        { path: '/signup', component: SignupPage, props: true, meta: { requiresUnauth: true } },
        { path: '/cart', component: CartPage, props: true, meta: { requiresAuth: true } },
        { path: '/:notFound(.*)', component: NotFoundPage },
    ],
    scrollBehavior() {
        return { left: 0, top: 0 };
    }  
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
        next('/signup');
    } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
        next('/')
    } else {
        next();
    }
});

export default router;