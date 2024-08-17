<template>
    <RouterLink :to="`/profile/${props.id}`" class="w-full h-auto flex flex-col items-center">
        <img :src="thumbnail" class="w-full object-cover object-center rounded-full aspect-square"/>
        <p>{{ name }}</p>
    </RouterLink>
</template>

<script setup lang="ts">
    const props = defineProps(["id", "name", "thumbnail"])
</script>