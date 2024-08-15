<template>
    <div class="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 h-auto flex flex-col p-2">
        <RouterLink :to="`/playlist/${props.id}`">
            <div class="w-full h-40">
                <img :src="props.thumbnail" class="w-full h-full aspect-square"/>
            </div>
            <p class="text-white">{{ props.title }}</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(["id", "thumbnail", "title"])
</script>