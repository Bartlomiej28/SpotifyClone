<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-auto flex flex-col md:flex-row gap-4 items-center bg-gradient-to-b from-violet-600 to-black p-4">
            <div class=" w-1/2 aspect-auto">
                <img :src="playlistImage" class="w-full h-full object-cover object-center aspect-square" alt="Playlist image"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-2 text-center md:text-left">
                <p class="text-white text-sm md:text-base">Playlista publiczna</p>
                <p class="text-white text-4xl md:text-7xl font-bold">{{ playlistName }}</p>
                <p class="text-white text-sm md:text-base">{{ playlistDescription }}</p>
                <div class="w-full h-auto flex flex-col md:flex-row gap-4 text-white items-center justify-center md:justify-start">
                    <p class="text-sm md:text-base">{{ playlistOwner }}</p>
                    <p><i class='bx bxs-circle text-[5px] md:text-xs'></i></p>
                    <p class="text-sm md:text-base">zapisano {{ playlistFollowers }} razy</p>
                </div>
            </div>
        </div>
        <div class="w-full h-auto overflow-x-auto bg-[#121212] text-white p-4">
            <table class="table-auto min-w-full text-left">
                <thead>
                    <tr class="text-white opacity-50">
                        <th class="px-2 py-2 text-sm">#</th>
                        <th class="px-2 py-2 text-sm">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell text-sm">Album</th>
                        <th class="px-2 py-2 text-center text-sm"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center text-sm"><i class='bx bx-plus'></i></th>
                    </tr>
                </thead>
                <tbody>
                    <PlaylistTrackComponent 
                        v-for="(track, index) in playlistTracks"
                        :key="track.track.id"
                        :id="track.track.id"
                        :image="track.track.album.images[2].url"
                        :title="track.track.name"
                        :author="track.track.artists.map((artists: any) => ' ' + artists.name)"
                        :album="track.track.album.name"
                        :duration="track.track.duration_ms"
                        :uri="track.track.uri"
                        :number="index + 1"
                    />
                </tbody>
                <tfoot>
                    <tr>
                        <th class="px-2 py-2 text-sm">#</th>
                        <th class="px-2 py-2 text-sm">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell text-sm">Album</th>
                        <th class="px-2 py-2 text-center text-sm"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center text-sm"><i class='bx bx-plus'></i></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref, watch } from 'vue';
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';
    import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';
    import { useRoute } from 'vue-router';

    const route = useRoute();

    const tokenStore = useTokenStore();


    interface Artist {
        name: string;
    }

    interface Album {
        name: string;
        images: { url: string }[];
    }

    interface Track {
        id: string;
        name: string;
        artists: Artist[];
        album: Album;
        duration_ms: number;
        uri: string
    }

    interface PlaylistTrack {
        track: Track;
    }

    const playlistName = ref("");
    const playlistDescription = ref("");
    const playlistImage = ref("");
    const playlistTracks = ref<PlaylistTrack[]>([]);
    const playlistOwner = ref("");
    const playlistFollowers = ref(0);

    const isLoading = ref(false);

    const getCurrentPlaylist = async () => {
        try {
            const playlistID = route.params.id
            isLoading.value = true
            const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistID}`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });

            const data = response.data;

            playlistName.value = data.name;
            playlistDescription.value = data.description.startsWith("<a") ? "" : data.description;
            playlistImage.value = data.images[0].url;
            playlistTracks.value = data.tracks.items;
            playlistOwner.value = data.owner.display_name;
            playlistFollowers.value = data.followers.total;

            isLoading.value = false;
        } catch (error) {
            console.log('Get tracks from playlist error: ' + error);
        }
    };

    onMounted(async () => {
        await getCurrentPlaylist();
    });

    watch(() => route.params.id, () => {
        getCurrentPlaylist(); 
    }
);
</script>
