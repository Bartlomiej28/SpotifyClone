<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto flex flex-col">
        <AlbumSidebarComponent v-for="album in albums"
            :id="album.album.id"
            :thumbnail="album.album.images[0].url"
            :title="album.album.name"
            :owner="album.album.artists[0].name"/>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import AlbumSidebarComponent from './AlbumSidebarComponent.vue';
import LoadingWindowComponent from './LoadingWindowComponent.vue';
    
    type Album ={
        album:{
            artists: Artist[]
            images: { url: string }[],
            name: string,
            id: string 
        }
    }

    type Artist ={
        name: string
    }

    const tokenStore = useTokenStore();
    const albums = ref<Album[]>([])
    const isLoading = ref(false)

    const getUsersAlbums = async() =>{
        try {
            isLoading.value = true
            const response = await axios.get('https://api.spotify.com/v1/me/albums?limit=10',{
                headers:{
                        Authorization: "Bearer " + tokenStore.tokenValue,
                        "Content-Type": "application/json",
                    },
            })
            albums.value = response.data.items
            isLoading.value = false
        } catch (error) {
            console.log("Get user's albums error: ", error)
        }
    }

    onMounted(async()=>{
        await getUsersAlbums();
    })
</script>