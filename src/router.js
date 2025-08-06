import { createRouter, createMemoryHistory } from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Home from './views/Home.vue';
import Transactions from './views/Transactions.vue';
import Contact from './views/Contact.vue';
import NotFound from './views/NotFound.vue';

const routes = [
    { path: '/home', component: Home },
    { path: '/', component: Dashboard },
    { path: '/transactions', component: Transactions},
    { path: '/contact', component: Contact },
    // {path: "/*", component: NotFound}
]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

export default router