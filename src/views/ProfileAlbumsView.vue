<template>
    <div class="w-full h-auto flex flex-wrap">
        <AlbumComponent 
            v-for="album in albums" 
            :key="album.id"
            :albumTitle="album.name"
            :publishYear="album.release_date"
            :type="album.type"
            :albumThumbnail="album.images[0].url"
            :albumID="album.id"
        /> 
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';
    import axios from 'axios';
    import { useTokenStore } from '@/stores/tokenStore';
    import AlbumComponent from '@/components/AlbumComponent.vue';

    const artistID = window.location.href.split('/')[4];
    const tokenStore = useTokenStore();

    interface Album {
        id: string;
        name: string;
        release_date: string;
        type: string;
        images: Array<{ url: string }>;
    }

    const albums = ref<Album[]>([]);

    const getArtistAlbums = async () => {
        try {
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data.items);
            albums.value = response.data.items;
        } catch (error) {
            console.log("Get artist's albums error: ", error);
        }
    };

    onMounted(async () => {
        await getArtistAlbums();
    });
</script>
