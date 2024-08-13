<template>
    <div class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-auto flex flex-row overflow-x-auto bg-[#121212] text-white p-4">
            <table class="table">
                <!-- head -->
                <thead>
                    <tr class="text-white opacity-50">
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
                        <th><i class='bx bx-time'></i></th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <PlaylistTrackComponent v-for="(track, index) in tracks"
                        :id="track.track.id"
                        :image="track.track.album.images[0].url"
                        :title="track.track.name"
                        :author="track.track.album.artists.map((artists: any) =>' '+ artists.name)"
                        :album="track.track.album.name"
                        :duration="track.track.duration_ms"
                        :number="index + 1"/>
                </tbody>

                <tfoot>
                    <tr>
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
                        <th><i class='bx bx-time'></i></th>
                        <th></th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</template>


<script setup lang="ts">
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import { onMounted, ref } from 'vue';
    import PlaylistTrackComponent from '@/components/PlaylistTrackComponent.vue';

    type Track = {
        track:{
            album: {
            name: string,
            artists: Artist[],
            images: { url: string }[],
        },
            duration_ms: number,
            id: string,
            name: string,
        }
    }

    type Artist = {
        name: string
    }

    const tokenStore = useTokenStore();
    const tracks = ref<Track[]>([]);

    const getLikedSongs = async () => {
        try {
            const response = await axios.get('https://api.spotify.com/v1/me/tracks?limit=50', {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
            tracks.value = response.data.items
        } catch (error) {
            console.log('Get liked songs error: ', error);
        }
    }



    onMounted(async () => {
        await getLikedSongs();
    });
</script>