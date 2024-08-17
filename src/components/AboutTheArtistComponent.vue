<template>
    <div class="w-full h-full flex flex-col">
        <div class="w-full h-60">
            <img :src="profileThumbnail" alt="About the author" class="w-full h-full object-cover object-center rounded-t-xl"/>
        </div>
        <div class="w-full h-auto flex flex-col gap-0 p-4 bg-[#242424] rounded-b-xl">
            <RouterLink :to="`/profile/${profileID}`" class="text-xl font-bold text-white cursor-pointer hover:underline">{{ profileName }}</RouterLink>
            <div class="w-full flex flex-col sm:flex-col md:flex-row justify-between items-center">
                <p class="text-[rgb(156,156,156)]">{{ followers }} słuchaczy w tym miesiącu</p>
                <button @click="followUnfollowProfile" class="px-4 py-2 text-white border border-[#9c9c9c] rounded-full">
                    <p class="text-sm" v-if="isUserFollowProfile">Przestań obserwować</p>
                    <p class="text-sm" v-else>Obserwuj</p>
                </button>
            </div>
            <p class="w-full h-auto text-ellipsis text-[#9c9c9c] text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis, ab ipsam, itaque tenetur nisi rerum officia eveniet incidunt possimus vel nesciunt quo vero reiciendis, pariatur voluptas labore molestiae culpa!
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref, watch } from 'vue';
    import axios from 'axios';
    import { useCurrentPlayingStore } from '@/stores/CurrentPlayingStore';

    const currentPlaying = useCurrentPlayingStore();
    const tokenStore = useTokenStore();
    const profileID = ref("");
    const followers = ref(0);
    const profileThumbnail = ref("");
    const profileName = ref("");

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

    const getArtistData = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${currentPlaying.authorID}`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data);
            const { id, images, followers: artistFollowers, name } = response.data;
            followers.value = artistFollowers.total;
            profileID.value = id;
            profileName.value = name;
            profileThumbnail.value = images[0].url;

        } catch (error) {
            console.log('Get artist data error: ', error);
        }
    };
    onMounted(async()=>{
        await getArtistData();
        await checkIfUserFollowsArtistOrUser();
    });

    watch(() => currentPlaying.authorID,
        async (newAuthorID) => {
            if (newAuthorID) {
                await getArtistData();
                await checkIfUserFollowsArtistOrUser();
            }
        }
    );
</script>