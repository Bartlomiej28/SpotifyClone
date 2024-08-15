<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-screen p-2 overflow-y-auto bg-black">
    
        <div class="w-full h-auto flex flex-col md:flex-row gap-4 items-center bg-gradient-to-b from-slate-300 to-black p-4">
       
            <div class="w-1/2 aspect-auto">
                <img :src="profileThumbnail" class="w-full h-full object-cover object-center aspect-square" alt="Profile image"/>
            </div>
           
            <div class="w-full h-auto flex flex-col gap-2 text-center md:text-left">
                <p class="text-white text-4xl md:text-7xl font-bold">{{ profileName }}</p>
                <p class="text-white text-sm md:text-base">{{ followers }} słuchaczy w tym miesiącu</p>
            </div>
        </div>

 
        <div class="w-full h-auto flex flex-col bg-[#121212] text-white p-4">
            <div class="w-full flex flex-col md:flex-row gap-4 mb-4 items-center justify-center md:justify-start">

                <button class="bg-green-500 text-white px-4 py-2 rounded-full font-semibold text-sm md:text-base" @click="followUnfollowProfile">
                    <p v-if="isUserFollowProfile">Przestań obserwować</p>
                    <p v-else>Obserwuj</p>
                </button>

                <RouterLink to="popular" class="bg-[#232323] px-4 py-2 font-semibold rounded-full text-sm md:text-base" activeClass="bg-slate-100 text-black">Popularne wydania</RouterLink>
                <RouterLink to="albums" class="bg-[#232323] px-4 py-2 font-semibold rounded-full text-sm md:text-base" activeClass="bg-slate-100 text-black">Albumy</RouterLink>
            </div>
  
            <RouterView/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue'
    import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';
    const artistID = window.location.href.split('/')[4]
    const tokenStore = useTokenStore();

    const profileID = ref("");
    const followers = ref(0);
    const profileThumbnail = ref("");
    const profileName = ref("");

    const isLoading = ref(false)

    const getArtistData = async () => {
        try {
            isLoading.value = true
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
           
            const { id, images, followers: artistFollowers, name } = response.data;
            followers.value = artistFollowers.total;
            profileID.value = id;
            profileName.value = name;
            profileThumbnail.value = images[0].url;

            isLoading.value = false
        } catch (error) {
            console.log('Get artist data error: ', error);
        }
    };

    const isUserFollowProfile = ref(false);

    const checkIfUserFollowsArtistOrUser = async() =>{
        try {
            const response = await axios.get(`https://api.spotify.com/v1/me/following/contains?type=artist&ids=${profileID.value}`,{
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            })
            isUserFollowProfile.value = response.data[0]
        } catch (error) {
            console.log('Check If User follows artist or user error: ', error)
        }
    }

    const handleFollowArtist = async() =>{
        try {
            const response = await axios.put(`https://api.spotify.com/v1/me/following?type=artist`,{
                ids: [profileID.value]
            },{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
        } catch (error) {
            console.log('Follow artist error: ', error)
        }
    }

    const handleUnfollowArtist = async() =>{
        try {
            const response = await axios.delete(`https://api.spotify.com/v1/me/following?type=artist&ids=${profileID.value}`,{
            headers:{
                Authorization: "Bearer " + tokenStore.tokenValue,
                "Content-Type": "application/json",
            }
        })
        } catch (error) {
            console.log('Unfollow artist error: ', error)
        }   
    }

    const followUnfollowProfile = async() =>{
        if(isUserFollowProfile.value){
            await handleUnfollowArtist();
        }else{
            await handleFollowArtist();
        }
        await checkIfUserFollowsArtistOrUser();
    }

    onMounted(async()=>{
        await getArtistData();
        await checkIfUserFollowsArtistOrUser();
    })
</script>