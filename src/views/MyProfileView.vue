<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-full p-2 overflow-y-auto bg-black">
    
        <div class="w-full h-auto flex flex-col md:flex-row gap-4 items-center bg-gradient-to-b from-violet-600 to-black p-4">
       
            <div class=" w-1/2 sm:w-1/2 md:w-1/2 aspect-auto">
                <img :src="thumbnail" class="w-full h-full object-cover object-center aspect-square rounded-full" alt="Profile image"/>
            </div>
           
            <div class="w-full h-auto flex flex-col gap-2 text-center md:text-left">
                <p class="text-white text-4xl md:text-6xl xl:text-7xl font-bold">{{ displayName }}</p>
                <p class="text-white text-sm md:text-base">{{ followersCount }} obserwujących</p>
            </div>
        </div>

        <div class="w-full h-auto flex flex-col bg-[#121212] text-white p-4">
            <h1 class="text-2xl sm:text-3xl md:text-4xl text-white font-bold m-4">Twoi najczęściej słuchani wykonawcy</h1>
           
            <div class="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 my-auto ">
                <ArtistComponent v-for="artist in artists"
                    :id="artist.id"
                    :name="artist.name"
                    :thumbnail="artist.images[0].url"
                />
               
                
            </div>
            
            <h1 class="w-full text-2xl sm:text-3xl md:text-4xl text-white font-bold m-4">Twoje najczęściej słuchane utwory</h1>
            <div class="overflow-x-auto">
                <table class="table-auto min-w-full text-left">
                    <thead>
                        <tr class="text-white opacity-50">
                            <th class="px-2 py-2 text-sm">#</th>
                            <th class="px-2 py-2 text-sm">Tytuł</th>
                            <th class="px-2 py-2 hidden md:table-cell text-sm">Album</th>
                            <th class="px-2 py-2 text-center text-sm"><i class='bx bx-time'></i></th>
                            <th class="px-2 py-2 text-center text-sm"><i class='bx bx-plus'></i></th>
                        </tr>
                    </thead>
                    <tbody>
                        <PlaylistTrackComponent 
                            v-for="(track, index) in tracks"
                            :key="track.id"
                            :id="track.id"
                            :image="track.album.images[2].url"
                            :title="track.name"
                            :author="track.artists.map((artists: any) => ' ' + artists.name)"
                            :album="track.album.name"
                            :duration="track.duration_ms"
                            :uri="track.uri"
                            :number="index + 1"
                        />
                    </tbody>
                    <tfoot>
                        <tr>
                            <th class="px-2 py-2 text-sm">#</th>
                            <th class="px-2 py-2 text-sm">Tytuł</th>
                            <th class="px-2 py-2 hidden md:table-cell text-sm">Album</th>
                            <th class="px-2 py-2 text-center text-sm"><i class='bx bx-time'></i></th>
                            <th class="px-2 py-2 text-center text-sm"><i class='bx bx-plus'></i></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';
    import profileImage from '../../public/profileImage.png'
    import ArtistComponent from '@/components/ArtistComponent.vue';
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';
    
    interface Track {
        id: string;
        name: string;
        artists: string[];
        album: Album;
        duration_ms: number;
        uri: string
    }

    interface Artist {
        name: string;
        id: string;
        images: {url: string}[],  
    }

    interface Album {
        name: string;
        images: { url: string }[];
    }

    const tokenStore = useTokenStore();
    const tracks = ref<Track[]>([]);
    const artists = ref<Artist[]>([]);
    const isLoading = ref(false);

    const getUsersTopTracks = async() =>{
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/top/tracks?limit=50',{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            tracks.value = response.data.items
        } catch (error) {
            console.log("Get user's top tracks error: ", error)
        }
    }

    const getUsersTopArtists = async() =>{
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=10',{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            artists.value = response.data.items
        } catch (error) {
            console.log("Get user's top tracks error: ", error)
        }
    }

    const displayName = ref("");
    const followersCount = ref(0);
    const thumbnail = ref("");

    const getUserData = async() =>{
        try {
            const response = await axios.get("https://api.spotify.com/v1/me",{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            const {display_name, followers, images} = response.data
            displayName.value = display_name
            followersCount.value = followers.total
            thumbnail.value = images.length > 0 ? images[0].url : profileImage
        

        } catch (error) {
            console.log("Get user's data error: ", error)
        }
    }

    onMounted(async()=>{
        isLoading.value = true
        await getUserData();
        await getUsersTopArtists();
        await getUsersTopTracks();
        isLoading.value = false
    })
</script>