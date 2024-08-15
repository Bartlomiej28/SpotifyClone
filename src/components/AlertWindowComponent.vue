<template>
    <div class="w-full h-auto flex justify-center absolute top-4 left-0 z-50">
        <div class="w-auto h-auto px-4 py-2 text-center border rounded-full bg-white border-red-500 animate-bounce flex gap-4 items-center">
            <p>{{ alertWindowState.text }}</p>
            <i @click="alertWindowState.HideAlertWindow()" class='bx bx-x text-2xl cursor-pointer'></i>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useAlretWindowStore } from '@/stores/alertWindowStore';
    const alertWindowState = useAlretWindowStore();
</script>