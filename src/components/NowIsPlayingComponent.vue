<template>
    <div class="w-full h-full overflow-y-scroll bg-[#121212] flex flex-col gap-4 pr-4 pl-4 pb-4 relative">
        <div class="w-full py-2 h-auto flex flex-row justify-between items-center bg-[#121212] mt-4 shadow-xl sticky top-0">
            <p class="font-bold text-white">Obecny utwór</p>
        </div>
        <div class="w-full h-96 mt-2">
            <img :src="currentPlayingStore.trackThumbnail" alt="current playing" class="w-full h-full"/>
        </div>
        <div class="w-full flex flex-col">
            <p class="text-2xl font-bold text-white">{{ currentPlayingStore.trackName }}</p>
            <p class=" text-[#9c9c9c]">{{ currentPlayingStore.trackArtists }}</p>
        </div>
        <AboutTheArtistComponent/>
    </div>
</template>

<script setup lang="ts">
    
    import AboutTheArtistComponent from './AboutTheArtistComponent.vue';
    import { useCurrentPlayingStore } from '@/stores/CurrentPlayingStore';
    const currentPlayingStore = useCurrentPlayingStore();

</script>