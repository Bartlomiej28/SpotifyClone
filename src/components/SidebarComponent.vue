<template>
    <div class="w-full h-full bg-black flex flex-col gap-4 p-2">
        <div class="w-full h-auto p-4 bg-[#121212] rounded-2xl flex flex-col gap-4">

            <div class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                <i className='bx bx-home edited-btns'></i>
                <RouterLink to='/'>Home</RouterLink>
            </div>

            <div class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                <i className='bx bx-search edited-btns'></i>
                <p>Szukaj</p>
            </div>
        </div>

        <div class="w-full h-auto p-4 bg-[#121212] rounded-2xl flex flex-col gap-4">
            <div class="w-full flex flex-row justify-between">
                <div class="flex flex-row gap-4 text-white text-xl items-center cursor-pointer">
                    <i className='bx bx-library edited-btns'></i>
                    <p>Biblioteka</p>
                </div>
                <div class="flex flex-row gap-4 text-white">
                    <i class='bx bx-plus text-xl' ></i>
                    <i class='bx bx-right-arrow-alt text-xl' ></i>
                </div>
            </div>
            <SidebarFiltersComponent/>
            <PlaylistsComponent/>
        </div>
    </div>
</template>

<script setup lang="ts">
import PlaylistsComponent from './PlaylistsComponent.vue';
import SidebarFiltersComponent from './SidebarFiltersComponent.vue';

/*121212*/
</script>