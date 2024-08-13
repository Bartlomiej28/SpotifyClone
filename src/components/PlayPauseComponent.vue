<template>
    <button @click="handlePlayPause" className="h-7 w-7 rounded-full flex justify-center items-center text-4xl text-white">
        <i v-if="playerState.playerStateValue" class='bx bx-play-circle' ></i>
        <i v-else class='bx bx-pause-circle' ></i>
    </button>
</template>

<script setup>
    import { usePlayerState } from '@/stores/playerStateStore';
    import { useTokenStore } from '@/stores/tokenStore';
    const tokenStore = useTokenStore();
    const playerState = usePlayerState();
    import axios from 'axios';

    const handlePlayPause = async() =>{
        const state = playerState.playerStateValue ? "pause" : "play"
        
        await axios.put(
      `https://api.spotify.com/v1/me/player/${state}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + tokenStore.tokenValue,
        },
      }
    );
        
        playerState.changePlayerState()
    }
    
</script>