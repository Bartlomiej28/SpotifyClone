<template>
    <div class="w-full h-auto flex flex-col text-white">
        <table class="table">
            <!-- head -->
            <thead>
            <tr class="text-white opacity-50">
                <th>#</th>
                <th>Tytuł</th>
                <th>Album</th>
                <th><i class='bx bx-time' ></i></th>
                <th><i class='bx bx-plus'></i></th>
            </tr>
            </thead>

            <tbody>
                <PlaylistTrackComponent v-for="(track, index) in tracks"
                    :id="track.id"
                    :image="track.album.images[2].url"
                    :title="track.name"
                    :author="track.album.artists.map((artists: any) =>' '+ artists.name)"
                    :album="track.album.name"
                    :duration="track.duration_ms"
                    :number="index + 1"
                    :uri="track.uri"
                   />
                    
            </tbody>

            <tfoot>
            <tr>
                
                <th>#</th>
                <th>Tytuł</th>
                <th>Album</th>
                <th><i class='bx bx-time' ></i></th>
                <th><i class='bx bx-plus'></i></th>
            </tr>
            </tfoot>
        </table>
    </div>
    
</template>

<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import PlaylistTrackComponent from './PlaylistTrackComponent.vue';

    const tokenStore = useTokenStore();

    type Track = {
        album:{
            artists :{
                id: string,
                name: string
            }[],
            images: {url: string}[],
            name: string
        },
        id: string,
        name: string,
        duration_ms: number,
        uri: string
    }

    const tracks = ref<Track[]>([]);

    const getRecommendations = async() =>{
        try {
            const response = await axios.get('https://api.spotify.com/v1/recommendations?limit=50&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop%2C+edm%2C+hiphop&seed_tracks=0c6xIDDpzE81m2q797ordA',{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            tracks.value = response.data.tracks
        } catch (error) {
            console.log('Get recommendations error: ', error)
        }
    }

    onMounted(async()=>{
        await getRecommendations();
    })

</script>