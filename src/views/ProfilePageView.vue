<template>
    <div class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-56 flex flex-row gap-4 items-center bg-gradient-to-b from-slate-300 to-black">
            <div class=" w-72 h-56">
                <img :src="profileThumbnail" class="bg-white w-full h-full object-cover object-center" alt="Playlist image"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <p class="text-white text-7xl font-bold">{{ profileName }}</p>
                <p class="text-white">{{ followers }} słuchaczy w tym miesiącu</p>
            </div>
        </div>
        <div class="w-full h-auto flex flex-col overflow-x-auto bg-[#121212] text-white p-4">
            <div class="w-full flex flex-row gap-4">
                <RouterLink to="popular" class="bg-[#232323] px-4 py-2 font-semibold rounded-full text-sm" activeClass="bg-slate-100 text-black">Popularne wydania</RouterLink>
                <RouterLink to="albums" class="bg-[#232323] px-4 py-2 font-semibold rounded-full text-sm" activeClass="bg-slate-100 text-black">Albumy</RouterLink>
            </div>
            <RouterView/>
        </div>
    </div>
</template>

<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue'

    

    const artistID = window.location.href.split('/')[4]
    const tokenStore = useTokenStore();

    const profileID = ref("");
    const followers = ref(0);
    const profileThumbnail = ref("");
    const profileName = ref("");

    

    const getArtistData = async () => {
        try {
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
        } catch (error) {
            console.log('Get artist data error: ', error);
        }
    };

    

   

    onMounted(async()=>{
        await getArtistData();
    })


</script>