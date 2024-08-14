<template>
    <button @click="handleSetPlaylistID" class="w-full flex flex-row gap-4 hover:bg-[#1a1a1a] p-2 cursor-pointer rounded-2xl focus:border focus:border-white text-start">
            <div class="w-16 h-14 aspect-square">
                <img :src="props.playlistImage" class="w-full h-full object-cover object-center bg-white rounded-xl aspect-square"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-0">
                <p class="text-white">{{ props.title }}</p>
                <p class="text-[#9c9c9c] text-sm">{{ props.owner}}</p>
            </div>
    </button>
</template>

<script setup lang="ts">
    import { usePlaylistStore } from '@/stores/PlaylistStore';
    const playlistStore = usePlaylistStore();

    const props = defineProps(["id", "title", "owner", "playlistImage"]);
    
    const handleSetPlaylistID = () =>{
        playlistStore.setPlaylistIDValue(props.id)
    }
</script>