<template>
    <div class="w-full h-screen flex flex-col relative">
        <div v-if="screenWidth < 800" class="w-full h-full">
            <div class="w-full sticky top-0 bg-black z-40">
                <NavbarComponent />
                <div class="w-full h-screen bg-black bg-opacity-50 absolute top-0 left-0 z-50 overflow-hidden" v-if="sidebarStore.showSidebar">
                    <div class="w-9/12 h-screen">
                        <SidebarComponent />
                    </div>
                </div>
                <AddToPlaylistWindow v-if="playlistStore.showAddToPlaylistWindow" />
                <CreateNewPlaylist v-if="sidebarStore.showCreateNewPlaylistWindow" />
            </div>
            <RouterView />
            <TrackBarComponent />
        </div>

        <div v-else>
            <div class="w-full flex flex-col md:flex-row h-[calc(100vh-5rem)]">
                <div class="w-full md:w-1/5 h-auto md:h-full">
                    <SidebarComponent />
                </div>
                <div class="w-full md:w-3/5 h-auto md:h-full flex flex-col">
                    <NavbarComponent />
                    <RouterView />
                </div>
                <div class="w-full md:w-1/5 h-auto md:h-full">
                    <NowIsPlayingComponent />
                </div>
            </div>
            <div class="w-full h-20 absolute z-40 left-0 bottom-0">
                <PlayerComponent />
            </div>
        </div>
        <AddToPlaylistWindow v-if="playlistStore.showAddToPlaylistWindow" />
    </div>
    <AlertWindowComponent v-if="alertWindowStore.showAlertWindow" />
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
    import { onMounted, onUnmounted, ref, watch } from 'vue';
    import { useSidebarStore } from '@/stores/SidebarStore';
    import CreateNewPlaylist from '@/components/CreateNewPlaylist.vue';

    const alertWindowStore = useAlretWindowStore();
    const playlistStore = usePlaylistStore();
    const sidebarStore = useSidebarStore();

    const screenWidth = ref(window.innerWidth);

    const updateScreenWidth = () => {
        screenWidth.value = window.innerWidth;
    };

    onMounted(() => {
        window.addEventListener('resize', updateScreenWidth);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', updateScreenWidth);
    });

</script>

