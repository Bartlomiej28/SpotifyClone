<template>
    <div class="w-full h-screen flex flex-col relative">
        <NavbarComponent/>
        <RouterView/>
        <TrackBarComponent/>
        <!--
        <div class="w-full flex flex-col md:flex-row h-[calc(100vh-5rem)]">
            <div class="w-full md:w-1/5 h-auto md:h-full">
                <SidebarComponent/>
            </div>
            <div class="w-full md:w-3/5 h-auto md:h-full flex flex-col">
                <NavbarComponent/>
                <RouterView/>
            </div>
            <div class="w-full md:w-1/5 h-auto md:h-full">
                <NowIsPlayingComponent/>
            </div>
        </div>
        <div class="w-full h-20 absolute z-40 left-0 bottom-0">
            <PlayerComponent/>
        </div>
        -->
    </div>
    
    <AddToPlaylistWindow v-if="playlistStore.showAddToPlaylistWindow"/>
    <AlertWindowComponent v-if="alertWindowStore.showAlertWindow"/>
</template>

<script setup lang="ts">
    import NavbarComponent from '@/components/NavbarComponent.vue';
    import SidebarComponent from '@/components/SidebarComponent.vue';
    import PlayerComponent from '@/components/PlayerComponent.vue';
    import NowIsPlayingComponent from '@/components/NowIsPlayingComponent.vue';
    import AddToPlaylistWindow from '@/components/AddToPlaylistWindow.vue';
    import { usePlaylistStore } from '@/stores/PlaylistStore';
    import AlertWindowComponent from '@/components/AlertWindowComponent.vue';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';
import TrackBarComponent from '@/components/TrackBarComponent.vue';


    const alertWindowStore = useAlretWindowStore();
    const playlistStore = usePlaylistStore();

</script>


<!--
BIG SCREEN:

<div class="w-full h-screen flex flex-col relative">
        <div class="w-full flex flex-col md:flex-row h-[calc(100vh-5rem)]">
            <div class="w-full md:w-1/5 h-auto md:h-full">
                <SidebarComponent/>
            </div>
            <div class="w-full md:w-3/5 h-auto md:h-full flex flex-col">
                <NavbarComponent/>
                <RouterView/>
            </div>
            <div class="w-full md:w-1/5 h-auto md:h-full">
                <NowIsPlayingComponent/>
            </div>
        </div>
        <div class="w-full h-20 absolute z-40 left-0 bottom-0">
            <PlayerComponent/>
        </div>
    </div>


-->