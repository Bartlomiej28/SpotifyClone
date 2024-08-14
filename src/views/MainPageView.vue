<template>
    <div class="w-full h-screen flex flex-col">
        <div class="w-full flex flex-row h-[calc(100vh-5rem)]">
            <div class="w-1/5 h-full">
                <SidebarComponent/>
            </div>
            <div class="w-3/5 h-full flex flex-col">
                <NavbarComponent/>
                <RouterView/>
            </div>
            <div class="w-1/5 h-full">
                <NowIsPlayingComponent/>
            </div>
        </div>
        <div class="w-full h-20">
            <PlayerComponent/>
        </div>
    </div>
    <AddToPlaylistWindow v-if="playlistStore.showAddToPlaylistWindow"/>
</template>

<script setup lang="ts">
    import NavbarComponent from '@/components/NavbarComponent.vue';
    import SidebarComponent from '@/components/SidebarComponent.vue';
    import PlayerComponent from '@/components/PlayerComponent.vue';
    import NowIsPlayingComponent from '@/components/NowIsPlayingComponent.vue';
    import AddToPlaylistWindow from '@/components/AddToPlaylistWindow.vue';
    import { usePlaylistStore } from '@/stores/PlaylistStore';

    const playlistStore = usePlaylistStore();

</script>