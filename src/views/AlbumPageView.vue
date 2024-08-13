<template>
    <div class="w-full h-screen p-2 overflow-y-auto bg-black">
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
            <table class="table">
                <!-- head -->
                <thead>
                <tr class="text-white opacity-50">
                    <th>#</th>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th><i class='bx bx-time' ></i></th>
                    <th></th>
                </tr>
                </thead>

                <tbody>
                    <AlbumTrackComponent v-for="(track, index) in albumTracks"
                        :id="track.id"
                        :title="track.name"
                        :author="track.artists.map((artists: any) =>' '+ artists.name)"
                        :duration="track.duration_ms"
                        :number="index + 1"/>
                </tbody>

                <tfoot>
                <tr class="text-white opacity-50">
                    
                    <th>#</th>
                    <th>Tytuł</th>
                    <th>Autor</th>
                    <th><i class='bx bx-time' ></i></th>
                    <th></th>
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

    const tokenStore = useTokenStore();

    const albumID = window.location.href.split('/')[4]


    const albumName = ref("");
    const albumTotalTracks = ref(0);
    const albumThumbnail = ref("");
    const albumTracks = ref([]);
    const albumOwner = ref("");


    

    const getAlbum = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/albums/${albumID}`,{
            headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            }
            
        )
        console.log(response.data)
        const {images, name, tracks, total_tracks, artists} = response.data
        
        albumName.value = name;
        albumThumbnail.value = images[0].url
        albumTracks.value = tracks.items
        albumOwner.value = artists[0].name
        albumTotalTracks.value = total_tracks
       
            
        } catch (error) {
            console.log('Get tracks from playlist error: '+ error)
        }
    }

    onMounted(async()=>{
        await getAlbum();
    })
</script>