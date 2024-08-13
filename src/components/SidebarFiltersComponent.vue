<template>
    <div class="w-full flex flex-wrap gap-2">
        <div @click="handleChangeSidebarFilter('playlists')" :class="`${filter === 'playlists' ? 'text-[#2a2a2a] bg-white' : 'bg-[#2a2a2a] text-white' } cursor-pointer px-4 py-2 text-sm rounded-full`">Playlisty</div>
        <div @click="handleChangeSidebarFilter('podcasts')" :class="`${filter === 'podcasts' ? 'text-[#2a2a2a] bg-white' : 'bg-[#2a2a2a] text-white' } cursor-pointer px-4 py-2 text-sm rounded-full`" >Podcasty</div>
        <div @click="handleChangeSidebarFilter('albums')" :class="`${filter === 'albums' ? 'text-[#2a2a2a] bg-white' : 'bg-[#2a2a2a] text-white' } cursor-pointer px-4 py-2 text-sm rounded-full`" >Albumy</div>
        <div @click="handleChangeSidebarFilter('artists')" :class="`${filter === 'artists' ? 'text-[#2a2a2a] bg-white' : 'bg-[#2a2a2a] text-white' } cursor-pointer px-4 py-2 text-sm rounded-full`" >Wykonawcy</div>
    </div>
</template>

<script setup lang="ts">
    import { useSidebarFilterStore } from '@/stores/SidebarFiltersStore';
import { computed } from 'vue';
    const sidebarFilterStore = useSidebarFilterStore();

    const filter = computed(()=> sidebarFilterStore.sidebarFilterValue);

    const handleChangeSidebarFilter = (newFilter : string) =>{
        sidebarFilterStore.changeSidebarFilter(newFilter)
        
    }
</script>