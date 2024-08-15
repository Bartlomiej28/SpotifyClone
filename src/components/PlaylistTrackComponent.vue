<template>
    <tr class="border-none hover:bg-[#2a2a2a] duration-300 cursor-pointer">
        <td class="px-2 py-1 text-center">{{ props.number }}</td>
        <td class="px-2 py-1">
            <div class="flex items-center gap-3">
                <div class="avatar flex-shrink-0">
                    <div class="mask mask-squircle h-10 w-10 sm:h-12 sm:w-12">
                        <img :src="props.image" alt="Album cover" />
                    </div>
                </div>
                <div>
                    <div class="font-bold text-sm sm:text-base">{{ props.title }}</div>
                    <div class="text-xs sm:text-sm opacity-50">{{ props.author.toString() }}</div>
                </div>
            </div>
        </td>
        <td class="hidden md:table-cell px-2 py-1 text-sm">{{ props.album }}</td>
        <td class="px-2 py-1 text-sm text-center">{{ msToMinutes(props.duration) }}</td>
        <td class="px-2 py-1 text-center">
            <i @click="handleAddToPlaylist" class='bx bx-plus hover:text-green-500 duration-300 text-lg'></i>
        </td>
    </tr>
</template>


<script setup lang="ts">
    import { ref } from 'vue';
    import { usePlaylistStore } from '@/stores/PlaylistStore';

    const props = defineProps(["id", "image", "title", "author", "album", "duration", "number", "uri"]);
    const playlistStore = usePlaylistStore();
   
    const msToMinutes = (ms: number) => {
        const minutes = Math.floor(ms / 60000);
        const seconds = Number(((ms % 60000) / 1000).toFixed(0)); // Convert to number using Number()
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }


    const handleAddToPlaylist = () =>{
        playlistStore.toggleAddToPlaylistWindow();
        playlistStore.setSongUri(props.uri)
    }

</script>