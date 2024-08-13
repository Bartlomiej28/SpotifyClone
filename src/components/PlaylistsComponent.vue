<template>
    <div class="w-full h-auto flex flex-col">
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
    const tokenStore = useTokenStore();
    const playlists = ref([])

    const getPlaylists = async() =>{
        try {
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
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    }

    onMounted(async()=>{
        await getPlaylists();
    })
</script>