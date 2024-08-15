<template>
    <div class="w-full h-16 flex flex-row justify-between p-4 bg-black">
        <div class="flex flex-row gap-4">
            <button @click="handleGoToPreviousPage" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-chevron-left'></i>
            </button>
            <button @click="handleGoToNextPage" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-chevron-right'></i>
            </button>
        </div>
        <div class="flex flex-row gap-2 sm:gap-4">
            <button class="flex items-center px-2 sm:px-4 text-xs sm:text-sm bg-white text-black rounded-full w-auto h-auto">Odkryj Premium</button>
            <button class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bx-bell'></i>
            </button>
            <button class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-group'></i>
            </button>
            <button class="h-7 w-7 rounded-full flex justify-center items-center bg-green-400 text-sm">B</button>
        </div>
    </div>
</template>


<script setup lang="ts">
    const handleGoToNextPage = () =>{
        history.forward();
    }

    const handleGoToPreviousPage = () =>{
        history.back();
    }
</script>

