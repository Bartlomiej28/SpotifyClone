<template>
    <div class="w-full h-full bg-black flex flex-col gap-4 p-2">
        <p class="w-full text-white text-2xl px-4 lg:hidden">
            <i @click="handleCloseSidebar" class='bx bx-x' ></i>
        </p>
        <div class="w-full h-auto p-4 bg-[#121212] rounded-2xl flex flex-col gap-4">
            <RouterLink to='/' class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                <i className='bx bx-home edited-btns'></i>
                <p>Home</p>
            </RouterLink>

            <div @click="alertWindowStore.ShowAlertWindow('Funkcja jest niedostępna')" class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                <i className='bx bx-search edited-btns'></i>
                <p>Szukaj</p>
            </div>
        </div>

        <div class="w-full h-full p-4 bg-[#121212] rounded-2xl flex flex-col gap-4 overflow-auto">
            <div class="w-full flex flex-row justify-between">
                <div class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                    <i className='bx bx-library edited-btns'></i>
                    <p>Biblioteka</p>
                </div>
                <i @click="handleShowCreateNewPlaylistWindow" class='bx bx-plus text-xl cursor-pointer text-white'></i>
            </div>
            <SidebarFiltersComponent/>
            <SidebarPlaylistsComponent v-if="filter === 'playlists'"/>
            <SidebarAlbumsComponent v-if="filter === 'albums'"/>
            <SidebarArtistsComponent v-if="filter === 'artists'"/>
        </div>
    </div>
    <CreateNewPlaylist v-if="showCreateNewPlaylist" :handleShowCreateNewPlaylistWindow="handleShowCreateNewPlaylistWindow"/>
</template>


<script setup lang="ts">
    import { computed,ref } from 'vue';
    import SidebarPlaylistsComponent from './SidebarPlaylistsComponent.vue';
    import SidebarFiltersComponent from './SidebarFiltersComponent.vue';
    import { useSidebarStore } from '@/stores/SidebarStore';
    import SidebarAlbumsComponent from './SidebarAlbumsComponent.vue';
    import CreateNewPlaylist from './CreateNewPlaylist.vue';
    import SidebarArtistsComponent from './SidebarArtistsComponent.vue';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';

    const showCreateNewPlaylist = ref(false);
    const alertWindowStore = useAlretWindowStore();
    const sidebarStore = useSidebarStore();
    const filter = computed(() => sidebarStore.sidebarFilterValue);

    const handleShowCreateNewPlaylistWindow = () =>{
        showCreateNewPlaylist.value = !showCreateNewPlaylist.value
    }

    const handleCloseSidebar = () =>{
        sidebarStore.showHideSidebar();
    }
</script>