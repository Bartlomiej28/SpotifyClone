<template>
    <div class="w-full h-auto flex flex-wrap">
        <FeaturedPlaylistComponent v-for="playlist in playlists"
            :id="playlist.id"
            :title="playlist.name"
            :thumbnail="playlist.images[0].url"
        />

    </div>
</template>

<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
import FeaturedPlaylistComponent from './FeaturedPlaylistComponent.vue';

    type Playlist = {
        description: string,
        id: string,
        images: {url: string }[],
        name: string,
    }

    const tokenStore = useTokenStore();
    const playlists = ref<Playlist[]>([])


    const getFeaturedPlaylists = async() =>{
        try {
            const response = await axios.get('https://api.spotify.com/v1/browse/featured-playlists?limit=20',{
            headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
        });
            playlists.value =  response.data.playlists.items
        } catch (error) {
            console.log('Get featured playlists error: ', error)
        }
    }

    onMounted(async()=>{
        await getFeaturedPlaylists();
    })
</script>