import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ScaleIntroView from '../views/ScaleIntroView.vue';
import ScaleFormView from '../views/ScaleFormView.vue';
import ScaleResultView from '../views/ScaleResultView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/scale/:id', name: 'scale-intro', component: ScaleIntroView },
    { path: '/scale/:id/form', name: 'scale-form', component: ScaleFormView },
    { path: '/scale/:id/result', name: 'scale-result', component: ScaleResultView },
  ],
  scrollBehavior: () => ({ top: 0 }),
});

export default router;
