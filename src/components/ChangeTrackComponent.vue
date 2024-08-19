<template>
    <button v-if="props.type === 'previous'" @click="handleChangeTrackToNext" className="h-7 w-7 rounded-full flex justify-center items-center text-3xl text-[#b3b3b3]"><i class='bx bx-skip-previous' ></i></button>
    <button v-else @click="handleChangeTrackToNext" className="h-7 w-7 rounded-full flex justify-center items-center text-3xl text-[#b3b3b3]"><i class='bx bx-skip-next' ></i></button>
</template>

<script setup lang="ts">
    const props = defineProps(["type"])
    import { useTokenStore } from '@/stores/tokenStore';
    import axios from 'axios';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';
    
    const alertWindowStore = useAlretWindowStore();
    const tokenStore = useTokenStore();

    const handleChangeTrackToNext = async() =>{
        try {
            await axios.post(`https://api.spotify.com/v1/me/player/${props.type}`,{},
                {
                    headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    },
                }
            );
        } catch (error) {
            alertWindowStore.ShowAlertWindow("Ta funkcja dostępna jest dla użytkowników Spotify Premium");
            console.log('Change track to next error: ',error)
        }
    }
</script>