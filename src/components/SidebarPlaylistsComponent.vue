<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto flex flex-col">
        <RouterLink to="/liked" class="w-full flex flex-row gap-4 hover:bg-[#1a1a1a] p-2">
            <div class="w-16">
                <img src="/likedSongs.png" class="w-full object-cover object-center aspect-square bg-white rounded-xl"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-0">
                <p class="text-white">Polubione utwory</p>
            </div>
        </RouterLink>
        <PlaylistComponent v-if="playlists" v-for="playlist in playlists"
            :id="playlist.id"
            :title="playlist.name"
            :owner="playlist.owner.display_name"
            :playlistImage="playlist.images[0].url"
        />
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import PlaylistComponent from './PlaylistComponent.vue';
import LoadingWindowComponent from './LoadingWindowComponent.vue';


    type Playlist = {
        id: string;
        name: string;
        owner: {
            display_name: string;
        };
        images: { url: string }[]
    }


    const tokenStore = useTokenStore();
    const playlists = ref<Playlist[]>([]);
    const isLoading = ref(false)

    const getPlaylists = async() =>{
        try {
            isLoading.value = true
            const response = await axios.get("https://api.spotify.com/v1/me/playlists",
                {
                    headers:{
                        Authorization: "Bearer " + tokenStore.tokenValue,
                        "Content-Type": "application/json",
                    },
                }
            );
            const {items} = response.data;
            playlists.value = items
            isLoading.value = false
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    }

    onMounted(async()=>{
        await getPlaylists();
    })
</script>