<template>
    <RouterLink :to="`/album/${albumID}`" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 aspect-square flex flex-col p-2">
        <img :src="albumThumbnail" class="w-full h-full bg-white aspect-square object-cover object-center"/>
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