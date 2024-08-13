<template>
    <table class="table">
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
            <PlaylistTrackComponent v-for="(track, index) in tracks"
                :id="track.id"
                :image="track.album.images[2].url"
                :title="track.name"
                :author="track.artists.map((artists: any) =>' '+ artists.name)"
                :album="track.album.name"
                :duration="track.duration_ms"
                :number="index + 1"/>
        </tbody>

        <tfoot>
        <tr class="text-white opacity-50">
            <th>#</th>
            <th>Tytuł</th>
            <th>Album</th>
            <th><i class='bx bx-time' ></i></th>
            <th></th>
        </tr>
        </tfoot>
    </table>
</template>

<script setup lang="ts">
    import {onMounted, ref} from 'vue'
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';
    
    const tokenStore = useTokenStore()
    const artistID = window.location.href.split('/')[4]
    const tracks = ref([]);

    const getArtistsTopTracks = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`,{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            })
            tracks.value = response.data.tracks
        } catch (error) {
            console.log("Get artist's top tracks error: ", error)
        }
    }

    onMounted(async()=>{
        await getArtistsTopTracks();
    })
</script>