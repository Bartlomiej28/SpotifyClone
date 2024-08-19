<template>
    <div class="w-full h-16 flex flex-row justify-between p-4 bg-black">
        <div class="flex flex-row gap-4">
            <button @click="handleShowSidebar" class="h-7 w-7 md:hidden rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bx-menu'></i>
            </button>
           
            <button @click="handleGoToPreviousPage" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-chevron-left'></i>
            </button>
            <button @click="handleGoToNextPage" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-chevron-right'></i>
            </button>
        </div>
        <div class="flex flex-row gap-2 sm:gap-4">
            <button @click="alertWindowStore.ShowAlertWindow('Ze względu na ograniczenia Spotify API, ta funkcja jest niedostępna')" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bx-bell'></i>
            </button>
            <button @click="alertWindowStore.ShowAlertWindow('Ze względu na ograniczenia Spotify API, ta funkcja jest niedostępna')" class="h-7 w-7 rounded-full flex justify-center items-center text-2xl bg-[#040404] text-[#b3b3b3]">
                <i class='bx bxs-group'></i>
            </button>
            <RouterLink :to="`/my-profile/${profileID}`" class="h-7 w-7 rounded-full flex justify-center items-center bg-green-400 text-sm">{{ displayNameFirstLetter }}</RouterLink>
        </div>
    </div>
</template>


<script setup lang="ts">
    import { useTokenStore } from '@/stores/tokenStore';
    import { useSidebarStore } from '@/stores/SidebarStore';
    import axios from 'axios';
    import { onMounted, ref } from 'vue';
    import { useAlretWindowStore } from '@/stores/alertWindowStore';

    const tokenStore = useTokenStore();
    const displayNameFirstLetter = ref("")
    const profileID = ref("")
    const sidebarStore = useSidebarStore();
    const alertWindowStore = useAlretWindowStore();

    const getUserData = async() =>{
        try {
            const response = await axios.get("https://api.spotify.com/v1/me",{
                headers:{
                    Authorization: "Bearer " + tokenStore.tokenValue,
                    "Content-Type": "application/json",
                }
            })
            displayNameFirstLetter.value = response.data.display_name[0]
            profileID.value = response.data.id
        } catch (error) {
            console.log("Get user's data error: ", error)
        }
    }

    const handleShowSidebar = () =>{
        sidebarStore.showHideSidebar();
        console.log("Pokazuje")
    }

    const handleGoToNextPage = () =>{
        history.forward();
    }

    const handleGoToPreviousPage = () =>{
        history.back();
    }

    onMounted(async()=>{
        await getUserData();
    })
    
</script>

