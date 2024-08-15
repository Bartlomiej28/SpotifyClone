<template>
    <tr class="border-none hover:bg-[#2a2a2a] duration-300 cursor-pointer">
        <td>
                {{ props.number }}
        </td>
        <td>
            <div class="flex items-center gap-3">
                <div>
                    <div class="font-bold">{{ props.title }}</div>
                </div>
            </div>
        </td>
        <td> {{ props.author.toString() }}</td>
        <td> {{ msToMinutes(props.duration) }}</td>
        <td> <i @click="handleAddToPlaylist" class='bx bx-plus hover:text-green-500 duration-300 text-xl'></i></td>
    </tr> 
</template>

<script setup lang="ts">
   import { usePlaylistStore } from '@/stores/PlaylistStore';

    const props = defineProps(["id", "title", "author", "duration", "number", "uri"]);
    const playlistStore = usePlaylistStore();
    
    const msToMinutes = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Math.floor((ms % 60000) / 1000); 
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    const handleAddToPlaylist = () =>{
        playlistStore.toggleAddToPlaylistWindow();
        playlistStore.setSongUri(props.uri)
    }

</script>