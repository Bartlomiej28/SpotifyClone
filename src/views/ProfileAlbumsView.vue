<template>
    <LoadingWindowComponent v-if="isLoading"/>
    <div v-else class="w-full h-auto gap-4 p-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
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
    import LoadingWindowComponent from '@/components/LoadingWindowComponent.vue';

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
    const isLoading = ref(false)

        const getArtistAlbums = async () => {
        try {
            isLoading.value = true
            const response = await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums`, {
                headers: {
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                },
            });
            albums.value = response.data.items;
            isLoading.value = false
        } catch (error) {
            console.log("Get artist's albums error: ", error);
        }
    };

    onMounted(async () => {
        await getArtistAlbums();
    });
</script>
