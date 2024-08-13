<template>
    <RouterLink :to="`/album/${albumID}`" class="w-1/5 aspect-square flex flex-col p-2">
        <img :src="albumThumbnail" class="w-full h-full bg-white aspect-square object-cover object-center"/>
        <p>{{props.albumTitle}}</p>
        <div class="w-full flex flex-row justify-between text-white opacity-50">
            <p class="text-sm">{{ props.publishYear }}</p>
            <p class="text-sm">{{ props.type }}</p>
        </div>
    </RouterLink>
</template>

<script setup>
    const props = defineProps(["albumTitle", "publishYear", "type", "albumThumbnail", "albumID"])
</script>