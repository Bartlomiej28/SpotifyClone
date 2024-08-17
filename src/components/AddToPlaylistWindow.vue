<template>
    <div class="w-full h-screen absolute top-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div class="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 h-3/4 sm:h-4/5 md:h-5/6 bg-[#121212] rounded-2xl p-4 text-white overflow-y-auto">
            <p><i @click="handleCloseWindow" class='bx bx-x cursor-pointer text-2xl'></i></p>
            <h1 class="w-full text-center text-xl sm:text-2xl md:text-3xl font-bold">Dodaj utwór do Playlisty</h1>
            <AddToPlaylistComponent 
                v-if="playlists" 
                v-for="playlist in playlists"
                :id="playlist.id"
                :title="playlist.name"
                :owner="playlist.owner.display_name"
                :thumbnail="playlist.images[0].url"
            />
            <div class="w-full flex justify-center mt-8">
                <button @click="handleAddToPlaylist" class="bg-green-500 font-semibold px-4 py-2 rounded-full">Dodaj do Playlisty</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted } from 'vue';
    import { ref } from 'vue';
    import AddToPlaylistComponent from './AddToPlaylistComponent.vue';
    import { usePlaylistStore } from '@/stores/PlaylistStore';

    type Playlist = {
        id: string;
        name: string;
        owner: {
            display_name: string;
        };
        images: { url: string }[]
    }

    const playlistStore = usePlaylistStore();

    const tokenStore = useTokenStore();
    const playlists = ref<Playlist[]>([]);
    
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
            console.log(response.data.items)
        } catch (error) {
            console.error('Error fetching playlists:', error);
        }
    }

    const handleAddToPlaylist = () =>{
        try {
            const response = axios.post(`https://api.spotify.com/v1/playlists/${playlistStore.playlistIDValue}/tracks`,{
                    "uris": [
                        playlistStore.songURI
                    ],
                    "position": 0
                },
                {
                    headers:{
                        Authorization: "Bearer " + tokenStore.tokenValue,
                        "Content-Type": "application/json",
                    }
                })
        } catch (error) {
            
        }
    }

    const handleCloseWindow = () =>{
        playlistStore.toggleAddToPlaylistWindow();
    }

    onMounted(async()=>{
        await getPlaylists();
    })
</script>