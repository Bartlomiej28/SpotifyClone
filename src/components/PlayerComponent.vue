<template>
    <div class="w-full h-full p-4 bg-black flex flex-row justify-between">
        <div class="w-3/12 h-auto flex flex-row gap-4 items-center">
            <div class="w-16 h-16 object-cover object-center">
                <img :src="trackThumbnail" alt="track thumbnail" class="w-full h-full object-cover object-center"/>
            </div>
            <div class="flex flex-col gap-0">
                <p class="text-white">{{ trackName }}</p>
                <p class=" text-slate-400 text-xs font-bold">{{ trackArtists.toString() }}</p>
            </div>
            <button @click="handleLikeUnlikeTrack">
                <i :class="`bx ${likeState === true ? 'bxs-heart' : 'bx-heart'} text-green-400 duration-300 ease-in-out`"></i>
            </button>
        </div>
        <div class="w-6/12 flex flex-col justify-center items-center  px-16">
            <div class="flex flex-row gap-4">
                <button className="h-7 w-7 rounded-full flex justify-center items-center text-3xl text-green-400"><i class='bx bx-transfer-alt' ></i></button>
                <ChangeTrackComponent :type="'previous'"/>
                <PlayPauseComponent/>
                <ChangeTrackComponent :type="'next'"/>
                <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bx-repeat' ></i></button>
            </div>
            <div class="flex flex-row gap-1 w-full justify-center">
                <p class="text-slate-400">0:44</p>
                <input type="range" min="1" max="100" value="12" class="w-8/12" id="myRange">
                <p class="text-slate-400">3:28</p>
            </div>
        </div>
        <div class="w-3/12 flex flex-row gap-4 p-4 items-center justify-end">
            <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bxs-videos'></i></button>
            <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bx-microphone' ></i></button>
            <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bx-collection' ></i></button>
            <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bx-speaker' ></i></button>
            <button className="h-7 w-7 rounded-full flex justify-center items-center text-2xl text-[#b3b3b3]"><i class='bx bx-right-top-arrow-circle'></i></button>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import { useCurrentPlayingStore } from '@/stores/CurrentPlayingStore';
    import ChangeTrackComponent from './ChangeTrackComponent.vue';
    import PlayPauseComponent from './PlayPauseComponent.vue';

    
    const tokenStore = useTokenStore();
    const currentPlayingStore = useCurrentPlayingStore();
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
            await axios.delete(`https://api.spotify.com/v1/me/tracks?ids=${trackID.value}`,{
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