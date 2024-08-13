<template>
    <RouterLink :to="`/profile/${props.id}`" class="w-full flex flex-row gap-4 hover:bg-[#1a1a1a] p-2">
            <div class="w-16 h-14">
                <img :src="props.thumbnail" class="w-full h-full object-cover object-center bg-white rounded-xl"/>
            </div>
            <div class="w-full h-auto flex flex-col gap-0">
                <p class="text-white">{{ props.name }}</p>
            </div>
    </RouterLink>
</template>

<script setup lang="ts">
    const props = defineProps(["id", "name", "thumbnail"])
</script>