<template>
    <div class="w-1/6 h-auto flex flex-col p-2">
        <RouterLink :to="`/playlist/${props.id}`">
            <div class="w-full h-40 aspect-square">
                <img :src="props.thumbnail" class="w-full h-full aspect-square"/>
            </div>
            <p class="text-white">{{ props.title }}</p>
        </RouterLink>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps(["id", "thumbnail", "title"])
</script>