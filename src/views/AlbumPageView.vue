<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-56 flex flex-row gap-4 items-center bg-gradient-to-b from-slate-300 to-black">
            <div class=" w-72 h-56">
                <img :src="albumThumbnail" class="bg-white h-full aspect-square object-cover object-center" alt="Playlist image"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <p class="text-white">Album</p>
                <p class="text-white text-7xl font-bold">{{ albumName }}</p>
                
                <div class="w-full h-auto flex flex-row gap-4 text-white items-center">
                    <p>{{ albumOwner }}</p>
                    <p><i class='bx bxs-circle text-xs'></i></p>
                    <p>{{ albumTotalTracks }} utworów</p>
                </div>
            </div>
        </div>
        <div class="w-full h-auto flex flex-col overflow-x-auto bg-[#121212] text-white p-4">
            <button @click="handleSaveDeleteAlbum" :class="`w-min ${isAlbumSaved === true ? ' bg-white text-black' : 'bg-green-500 text-white'} px-4 py-2 rounded-full flex flex-row gap-2 items-center`">
                <i class='bx bx-check-circle' ></i>
                <p v-if="isAlbumSaved">Usuń</p>
                <p v-else>Zapisz</p>
            </button>
            <table class="table">
                <!-- head -->
                <thead>
                <tr class="text-white opacity-50">
                    <th>#</th>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th><i class='bx bx-time' ></i></th>
                    <th><i class='bx bx-plus'></i></th>
                </tr>
                </thead>

                <tbody>
                    <AlbumTrackComponent v-for="(track, index) in albumTracks"
                        :id="track.id"
                        :title="track.name"
                        :author="track.artists.map((artists) =>' '+ artists.name)"
                        :duration="track.duration_ms"
                        :number="index + 1"
                        :uri="track.uri"
                        />
                </tbody>

                <tfoot>
                <tr class="text-white opacity-50">
                    
                    <th>#</th>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th><i class='bx bx-time' ></i></th>
                    <th><i class='bx bx-plus'></i></th>
                </tr>
                </tfoot>
            </table>

        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import AlbumTrackComponent from '@/components/AlbumTrackComponent.vue';
import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';

    const tokenStore = useTokenStore();

    const albumID = window.location.href.split('/')[4];

    type Artist ={
        name: string;
    }

    type Track ={
        id: string;
        name: string;
        artists: Artist[];
        duration_ms: number;
        uri: string
    }

    type Album = {
        id: string;
        name: string;
        total_tracks: number;
        images: Array<{ url: string }>;
        artists: Artist[];
        tracks: {
            items: Track[];
        };
    }

    const albumName = ref<string>("");
    const albumTotalTracks = ref<number>(0);
    const albumThumbnail = ref<string>("");
    const albumTracks = ref<Track[]>([]);
    const albumOwner = ref<string>("");

    const isAlbumSaved = ref(false);

    const checkUsersSavedAlbums = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me/albums/contains?ids=${albumID}`,{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            })
            isAlbumSaved.value = response.data[0]
        } catch (error) {
            console.log("Check user's saved album error: ", error)
        }
    }

    const handleSaveAlbum = async() =>{
        try {
                const response = await axios.put(`https://api.spotify.com/v1/me/albums`,{
                        ids: [albumID] 
                    },
                    {
                        headers: {
                            Authorization: "Bearer " + tokenStore.tokenValue,
                            "Content-Type": "application/json",
                        },
                    }
                )
            } catch (error) {
                console.log('Save album error: ', error)
            }
    }


    const handleDeleteAlbum = async() =>{
        try {
            const response = await axios.delete(`https://api.spotify.com/v1/me/albums?ids=${albumID}`,{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            })
        } catch (error) {
            console.log('Delete album error: ', error)
        }
    }

    const handleSaveDeleteAlbum = async() =>{
        if (isAlbumSaved.value) {
            await handleDeleteAlbum();
        } else {
            await handleSaveAlbum();
        }
        await checkUsersSavedAlbums(); 
    }

    const isLoading = ref(false);

    const getAlbum = async () => {
        try {
            isLoading.value = true
            const response = await axios.get<Album>(`https://api.spotify.com/v1/albums/${albumID}`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });

            const { images, name, tracks, total_tracks, artists } = response.data;
            albumName.value = name;
            albumThumbnail.value = images[0].url;
            albumTracks.value = tracks.items;
            albumOwner.value = artists[0].name;
            albumTotalTracks.value = total_tracks;

            isLoading.value = false
        } catch (error) {
            console.log('Get tracks from album error: ' + error);
        }
    };

    onMounted(async () => {
        await getAlbum();
        await checkUsersSavedAlbums();
    });
</script>
