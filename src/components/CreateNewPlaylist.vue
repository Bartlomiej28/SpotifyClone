<template>
    <div class="w-full h-screen absolute top-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
        <div class="w-1/3 h-5/6 bg-[#121212] rounded-2xl p-4 text-white">
            <p @click="props.handleShowCreateNewPlaylistWindow"><i class='bx bx-x cursor-pointer text-2xl' ></i></p>
            <h1 class="w-full text-center text-3xl font-bold">Stwórz nową playliste</h1>
            <label>
                <p class="mb-2 mt-4">Nazwa playlisty:</p>
                <input type="text" v-model="playlistName" class="bg-[#121212] w-full px-4 py-2 border border-white rounded-xl" placeholder="Wpisz nazwę playlisty"/>
            </label>
            <label>
                <p class="mb-2 mt-4">Opis playlisty:</p>
                <input type="text" v-model="playlistDesc" class="bg-[#121212] w-full px-4 py-2 border border-white rounded-xl" placeholder="Wpisz opis playlisty"/>
            </label>
            <div class="w-full flex justify-center mt-8">
                <button @click="handleCreateNewPlaylist" class="bg-green-500 font-semibold px-4 py-2 rounded-full">Stwórz playlistę</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(["handleShowCreateNewPlaylistWindow"]);
    import { ref } from 'vue';
    import { useTokenStore } from '@/stores/tokenStore';
    import axios from 'axios';

    const tokenStore = useTokenStore();
    const playlistName = ref("");
    const playlistDesc = ref("");

    const handleCreateNewPlaylist = async() =>{
        try {
            const response = await axios.post(`https://api.spotify.com/v1/users/bartlomiej.boczylo/playlists`,{
                "name": playlistName.value,
                "description": playlistDesc.value,
                "public": true,
                "images": [
                    {
                        "url": "https://e7.pngegg.com/pngimages/4/438/png-clipart-spotify-logo-spotify-mobile-app-computer-icons-app-store-music-free-icon-spotify-miscellaneous-logo.png",
                        "height": 300,
                        "width": 300
                    }
                 ],
            },
            {
                headers:{
                        Authorization: "Bearer " + tokenStore.tokenValue,
                        "Content-Type": "application/json",
                    }
            })
        } catch (error) {
            console.log("Create new playlist error: ", error)
        }
    }

</script>