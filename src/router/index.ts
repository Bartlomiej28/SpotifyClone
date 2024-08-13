import { createRouter, createWebHistory } from 'vue-router'

import HomePageView from '@/views/HomePageView.vue'
import PlaylistView from '@/views/PlaylistView.vue'
import ProfilePageView from '@/views/ProfilePageView.vue'
import AlbumPageView from '@/views/AlbumPageView.vue'
import ProfilePopularView from '@/views/ProfilePopularView.vue'
import ProfileAlbumsView from '@/views/ProfileAlbumsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomePageView },
    { path: '/playlist/:id', component: PlaylistView },
    { 
      path: '/profile/:id', 
      component: ProfilePageView,
      redirect: to => `/profile/${to.params.id}/popular`,  
      children: [
        { path: 'popular', component: ProfilePopularView },  // Podstrona 'popular' wewnątrz 'profile'
        { path: 'albums', component: ProfileAlbumsView }    // Podstrona 'albums' wewnątrz 'profile'
      ]
    },
    { path: '/album/:id', component: AlbumPageView },
    
  ]
})

export default router
