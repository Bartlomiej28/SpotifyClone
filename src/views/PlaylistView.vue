<template>
    <div class="w-full h-screen p-2 overflow-y-auto bg-black">
        <div class="w-full h-56 flex flex-row gap-4 items-center bg-gradient-to-b from-slate-300 to-black">
            <div class=" w-72 h-56">
                <img :src="playlistImage" class="bg-white w-full h-full object-cover object-center" alt="Playlist image"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-2">
                <p class="text-white">Playlista publiczna</p>
                <p class="text-white text-7xl font-bold">{{ playlistName }}</p>
                <p class="text-white">{{ playlistDescription }}</p>
                <div class="w-full h-auto flex flex-row gap-4 text-white items-center">
                    <p>{{ playlistOwner }}</p>
                    <p><i class='bx bxs-circle text-xs'></i></p>
                    <p>zapisano {{ playlistFollowers }} razy</p>
                </div>
            </div>
        </div>
        <div class="w-full h-auto flex flex-row overflow-x-auto bg-[#121212] text-white p-4">


                <table class="table">
                    <!-- head -->
                    <thead>
                    <tr class="text-white opacity-50">
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
                        <th><i class='bx bx-time' ></i></th>
                        <th></th>
                    </tr>
                    </thead>

                    <tbody>
                        <PlaylistTrackComponent v-for="(track, index) in playlistTracks"
                            :id="track.track.id"
                            :image="track.track.album.images[2].url"
                            :title="track.track.name"
                            :author="track.track.artists.map((artists: any) =>' '+ artists.name)"
                            :album="track.track.album.name"
                            :duration="track.track.duration_ms"
                            :number="index + 1"/>
                    </tbody>

                    <tfoot>
                    <tr>
                        
                        <th>#</th>
                        <th>Tytuł</th>
                        <th>Album</th>
                        <th><i class='bx bx-time' ></i></th>
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

    const tokenStore = useTokenStore();
    const playlistID = window.location.href.split('/')[4];

    interface Artist {
        name: string;
    }

    interface Album {
        name: string;
        images: Array<{ url: string }>;
    }

    interface Track {
        id: string;
        name: string;
        artists: Artist[];
        album: Album;
        duration_ms: number;
    }

    interface PlaylistTrack {
        track: Track;
    }

    interface Playlist {
        name: string;
        description: string;
        images: Array<{ url: string }>;
        tracks: {
            items: PlaylistTrack[];
        };
        owner: {
            display_name: string;
        };
        followers: {
            total: number;
        };
    }

    const playlistName = ref<string>("");
    const playlistDescription = ref<string>("");
    const playlistImage = ref<string>("");
    const playlistTracks = ref<PlaylistTrack[]>([]);
    const playlistOwner = ref<string>("");
    const playlistFollowers = ref<number>(0);

    const getCurrentPlaylist = async () => {
        try {
            const response = await axios.get<Playlist>(`https://api.spotify.com/v1/playlists/${playlistID}`, {
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

            console.log(playlistTracks.value);
        } catch (error) {
            console.log('Get tracks from playlist error: ' + error);
        }
    };

    onMounted(async () => {
        await getCurrentPlaylist();
    });
</script>
