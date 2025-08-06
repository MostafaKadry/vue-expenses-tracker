import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Home from './views/Home.vue';
import Transactions from './views/Transactions.vue';
import NotFound from './views/NotFound.vue';

const routes = [
    { path: '/home', component: Home },
    { path: '/', component: Dashboard },
    { path: '/transactions', component: Transactions},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router