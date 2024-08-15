<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto flex flex-col text-white">
        <div class="overflow-x-auto">
            <table class="table-auto min-w-full text-left">
                <thead>
                    <tr class="text-white opacity-50">
                        <th class="px-2 py-2">#</th>
                        <th class="px-2 py-2">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell">Album</th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-plus'></i></th>
                    </tr>
                </thead>
                <tbody>
                    <PlaylistTrackComponent
                        v-for="(track, index) in tracks"
                        :key="track.id"
                        :id="track.id"
                        :image="track.album.images[2].url"
                        :title="track.name"
                        :author="track.artists.map((artists: any) => ' ' + artists.name)"
                        :album="track.album.name"
                        :duration="track.duration_ms"
                        :number="index + 1"
                        :uri="track.uri"
                    />
                </tbody>
                <tfoot>
                    <tr>
                        <th class="px-2 py-2">#</th>
                        <th class="px-2 py-2">Tytuł</th>
                        <th class="px-2 py-2 hidden md:table-cell">Album</th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-time'></i></th>
                        <th class="px-2 py-2 text-center"><i class='bx bx-plus'></i></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';
    import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';

    const tokenStore = useTokenStore();
    const artistID = window.location.href.split('/')[4];

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

    const tracks = ref<Track[]>([]);
    const isLoading = ref(false)

    const getArtistsTopTracks = async () => {
        try {
            isLoading.value = true
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
            tracks.value = response.data.tracks;
            isLoading.value = false
        } catch (error) {
            console.log("Get artist's top tracks error: ", error);
        }
    };

    onMounted(async () => {
        await getArtistsTopTracks();
    });
</script>
