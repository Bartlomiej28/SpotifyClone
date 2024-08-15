<template>
    <div class="w-full h-auto flex flex-row gap-4 items-center bg-black justify-between px-4 bottom-0 left-0 sticky">
        <RouterLink :to="`/track/${trackID}`" class="w-16 h-16 object-cover object-center">
            <img :src="trackThumbnail" alt="track thumbnail" class="aspect-square"/>
        </RouterLink>
        <RouterLink :to="`/track/${trackID}`" class="flex flex-col gap-0">
            <p class="text-white">{{ trackName }}</p>
            <p class="text-slate-400 text-xs font-bold">{{ trackArtists.toString() }}</p>
        </RouterLink>
        <button @click="handleLikeUnlikeTrack">
            <i :class="`bx ${likeState === true ? 'bxs-heart' : 'bx-heart'} text-green-400 duration-300 ease-in-out`"></i>
        </button>
        <PlayPauseComponent/>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import { useCurrentPlayingStore } from '@/stores/CurrentPlayingStore';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';
    import PlayPauseComponent from './PlayPauseComponent.vue';

    const tokenStore = useTokenStore();
    const currentPlayingStore = useCurrentPlayingStore();
    const alertWindowStore = useAlretWindowStore();

    const trackID = ref("");
    const trackName = ref("")
    const trackArtists = ref([])
    const trackThumbnail = ref("")
    const trackAuthorID = ref("")

    const getCurrentTrack = async () => {
        try {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing",{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
        const { item } = response.data;

        trackID.value = item.id;
        trackName.value = item.name;
        trackArtists.value = item.artists.map((artist: { name: string }) => " " + artist.name);
        trackThumbnail.value = item.album.images[0].url;
        trackAuthorID.value = item.artists[0].id;

        currentPlayingStore.setCurrentPlayingSong({
            trackID: trackID.value,
            trackName: trackName.value,
            trackArtists: trackArtists.value.toString(),
            trackThumbnail: trackThumbnail.value,
            authorID: trackAuthorID.value
        });
        } catch (error) {
            console.log('Get current playing track error: ', error)
        }
    };

    const likeState = ref(false)

    const checkUsersSavedTracks = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me/tracks/contains?ids=${trackID.value}`,{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            })
            likeState.value = response.data[0]
        } catch (error) {
            console.log("Check user's saved tracks error: ", error)
        }
    }

    const handleLikeTrack = async() =>{
        try {
            await axios.put(`https://api.spotify.com/v1/me/tracks`,
            { 
                ids: [trackID.value] 
            },
            {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
                data:{
                    "ids": trackID.value
                }
            })
        } catch (error) {
            console.log('Like track error: ', error)
        }
    }

    const handleUnlikeTrack = async() =>{
        try {
            await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${trackID.value}`,
            {
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
        } catch (error) {
            console.log('Unlike track error: ', error)
        }
    }

    const handleLikeUnlikeTrack = async() =>{
        if(likeState.value){
            await handleUnlikeTrack();
            await checkUsersSavedTracks();
        }else{
           await handleLikeTrack();
           await checkUsersSavedTracks();
        }
    }

    onMounted(async()=>{
        await getCurrentTrack();
        await checkUsersSavedTracks();
    })
</script>