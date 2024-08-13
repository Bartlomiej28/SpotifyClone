<template>
    <div class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-56 flex flex-row gap-4 items-center bg-gradient-to-b from-slate-300 to-black">
            <div class=" w-72 h-56">
                <img :src="playlistImage" class="bg-white w-full h-full object-cover object-center" alt="Playlist image"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <p class="text-white">Playlista publiczna</p>
                <p class="text-white text-7xl font-bold">{{ playlistName }}</p>
                <p class="text-white">{{ playlistDescription }}</p>
                <div class="w-full h-auto flex flex-row gap-4 text-white items-center">
                    <p>{{ playlistOwner }}</p>
                    <p><i class='bx bxs-circle text-xs'></i></p>
                    <p>zapisano {{ playlistFollowers }} razy</p>
                </div>
            </div>
        </div>
        <div class="w-full h-auto flex flex-row overflow-x-auto bg-[#121212] text-white p-4">


                <table class="table">
                    <!-- head -->
                    <thead>
                    <tr class="text-white opacity-50">
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
                        <th><i class='bx bx-time' ></i></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        <PlaylistTrackComponent v-for="(track, index) in playlistTracks"
                            :id="track.track.id"
                            :image="track.track.album.images[2].url"
                            :title="track.track.name"
                            :author="track.track.artists.map((artists: any) =>' '+ artists.name)"
                            :album="track.track.album.name"
                            :duration="track.track.duration_ms"
                            :number="index + 1"/>
                    </tbody>

                    <tfoot>
                    <tr>
                        
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
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
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';
    const tokenStore = useTokenStore();

    const playlistID = window.location.href.split('/')[4]
    console.log(playlistID)

    const playlistName = ref("");
    const playlistDescription = ref("");
    const playlistImage = ref("");
    const playlistTracks = ref([]);
    const playlistOwner = ref("");
    const playlistFollowers = ref(0)
    const num = ref(1)
    

    const getCurrentPlaylist = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`,{
            headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            }
            
        )
        console.log(response.data)
        playlistName.value = await response.data.name;
        playlistDescription.value = await response.data.description.startsWith("<a") ? "" : response.data.description
        playlistImage.value = await response.data.images[0].url
        playlistTracks.value = await response.data.tracks.items
        playlistOwner.value = await response.data.owner.display_name
        playlistFollowers.value = await response.data.followers.total

        console.log(playlistTracks.value)
        /*
       const selectedPlaylist.value = {
            id: response.data.id,
            name: response.data.name,
            description: response.data.description.startsWith("<a") ? "" : response.data.description,
            image: response.data.images[0].url,
            tracks: response.data.tracks.items.map(({track} : any) => ({
                id: track.id,
                name: track.name,
                artists: track.artists.map((artists : any) => artists.name),
                image: track.album.images[2].url,
                duration: track.duration_ms,
                album: track.album.name,
                context_uri: track.album.uri,
                track_number: track.track_number
            })),
        };
        */
            
        } catch (error) {
            console.log('Get tracks from playlist error: '+ error)
        }
    }

    onMounted(async()=>{
        await getCurrentPlaylist();
    })
</script>