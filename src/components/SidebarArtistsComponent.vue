<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto flex flex-col overflow-scroll">
        <ArtistSidebarComponent v-for="artist in artists"
            :id="artist.id"
            :name="artist.name"
            :thumbnail="artist.images[0]?.url"/>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import ArtistSidebarComponent from './ArtistSidebarComponent.vue';
import LoadingWindowComponent from './LoadingWindowComponent.vue';

    type Artist = {
        id: string,
        images: { url: string }[],
        name: string
    }

    const artists = ref<Artist[]>([])
    const tokenStore = useTokenStore();
    const isLoading = ref(false)

    const getUsersArtists = async() =>{
        try {
            isLoading.value = true
            const response = await axios.get('https://api.spotify.com/v1/me/following?type=artist&limit=50',{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            artists.value = response.data.artists.items
            isLoading.value = false
        } catch (error) {
            console.log("Get user's followed artists error: ", error)
        }
    }

    onMounted(async()=>{
        await getUsersArtists();
    })
</script>