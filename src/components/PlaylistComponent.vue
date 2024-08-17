<template>
    <RouterLink :to="`/playlist/${props.id}`" class="w-full flex flex-row gap-4 hover:bg-[#1a1a1a] p-2">
            <div class="w-16">
                <img :src="props.playlistImage" class="w-full h-full object-cover object-center bg-white rounded-xl aspect-square"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-0">
                <p class="text-white">{{ props.title }}</p>
                <p class="text-[#9c9c9c] text-sm">{{ props.owner}}</p>
            </div>
    </RouterLink>
</template>

<script setup lang="ts">
    const props = defineProps(["id", "title", "owner", "playlistImage"]);
</script>