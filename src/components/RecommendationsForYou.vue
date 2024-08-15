<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto flex flex-col text-white">
        <div class="overflow-x-auto">
            <table class="table-auto min-w-full text-left">
                <thead>
                    <tr class="text-white opacity-50">
                        <th class="px-2 py-2">#</th>
                        <th class="px-2 py-2">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell">Album</th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-plus'></i></th>
                    </tr>
                </thead>
                <tbody>
                    <PlaylistTrackComponent
                        v-for="(track, index) in tracks"
                        :key="track.id"
                        :id="track.id"
                        :image="track.album.images[2].url"
                        :title="track.name"
                        :author="track.album.artists.map((artists: any) => ' ' + artists.name)"
                        :album="track.album.name"
                        :duration="track.duration_ms"
                        :number="index + 1"
                        :uri="track.uri"
                    />
                </tbody>
                <tfoot>
                    <tr>
                        <th class="px-2 py-2">#</th>
                        <th class="px-2 py-2">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell">Album</th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-plus'></i></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import PlaylistTrackComponent from './PlaylistTrackComponent.vue';
    import LoadingWindowComponent from './LoadingWindowComponent.vue';

    const tokenStore = useTokenStore();
    const isLoading = ref(false)

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
            isLoading.value = true
            const response = await axios.get('https://api.spotify.com/v1/recommendations?limit=50&seed_artists=4NHQUGzhtTLFvgF5SZesLK&seed_genres=pop%2C+edm%2C+hiphop&seed_tracks=0c6xIDDpzE81m2q797ordA',{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            tracks.value = response.data.tracks
            isLoading.value = false
        } catch (error) {
            console.log('Get recommendations error: ', error)
        }
    }

    onMounted(async()=>{
        await getRecommendations();
    })

</script>