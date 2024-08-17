<template>
    <RouterLink :to="`/album/${albumID}`" class="w-full aspect-square flex flex-col p-2">
        <img :src="albumThumbnail" class="w-full h-full aspect-square object-cover object-center"/>
        <p class="mt-2 text-center">{{ albumTitle }}</p>
        <div class="w-full flex flex-row justify-between text-white opacity-50 mt-2">
            <p class="text-sm">{{ publishYear }}</p>
            <p class="text-sm">{{ type }}</p>
        </div>
    </RouterLink>
</template>

<script setup>
    const props = defineProps(["albumTitle", "publishYear", "type", "albumThumbnail", "albumID"])
</script>