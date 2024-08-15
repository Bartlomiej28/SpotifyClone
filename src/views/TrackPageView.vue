<template>
    <div v-if="trackID" class="w-full h-auto flex flex-col relative">
        <NowIsPlayingComponent/>
        <div class="w-full h-20 flex flex-col justify-center items-center z-50 sticky bottom-0 left-0 bg-black">
            <div class="flex flex-row gap-4">
                <button class="h-7 w-7 rounded-full flex justify-center items-center text-3xl text-green-400">
                    <i class='bx bx-transfer-alt'></i>
                </button>
                <ChangeTrackComponent :type="'previous'"/>
                <PlayPauseComponent/>
                <ChangeTrackComponent :type="'next'"/>
                <button class="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]">
                    <i class='bx bx-repeat'></i>
                </button>
            </div>
            <div class="flex flex-row gap-1 w-full justify-center">
                <p class="text-slate-400">0:44</p>
                <input type="range" min="1" max="100" value="12" class="w-8/12" id="myRange">
                <p class="text-slate-400">3:28</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import NowIsPlayingComponent from '@/components/NowIsPlayingComponent.vue';
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import { useCurrentPlayingStore } from '@/stores/CurrentPlayingStore';
    import ChangeTrackComponent from '@/components/ChangeTrackComponent.vue';
    import PlayPauseComponent from '@/components/PlayPauseComponent.vue';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';

    const tokenStore = useTokenStore();
    const currentPlayingStore = useCurrentPlayingStore();
    const alertWindowStore = useAlretWindowStore();

    const trackID = ref("");
    const trackName = ref("")
    const trackArtists = ref([])
    const trackThumbnail = ref("")
    const trackAuthorID = ref("")

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
    onMounted(async()=>{
        await getCurrentTrack();
        await checkUsersSavedTracks();
    })
</script>