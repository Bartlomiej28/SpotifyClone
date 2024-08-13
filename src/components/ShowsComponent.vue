<template>
    <div class="w-full h-auto flex flex-col">
        <p v-if="shows.length === 0" class="text-white text-center text-xs">Brak zapisanych podcastów</p>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import ShowSidebarComponent from './ShowSidebarComponent.vue';
    const tokenStore = useTokenStore();

    const shows = ref([])
    const getUsersShows = async() =>{
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/shows', {
                headers:{
                        Authorization: "Bearer " + tokenStore.tokenValue,
                        "Content-Type": "application/json",
                    },
            })
            console.log(response)
            shows.value = response.data.items
        } catch (error) {
            console.log("Get user's shows error: ", error)
        }
    }

    onMounted(async()=>{
        await getUsersShows();
    })
</script>