<template>
    <div class="w-full h-full overflow-y-scroll bg-[#121212] p-4">
        <h1 class="text-3xl sm:text-4xl md:text-4xl text-white font-bold m-4">Najpopularniejsze Playlisty</h1>
        <FeaturedPlaylists/>
        <h2 class="text-5xl text-white font-bold m-4">Nasze rekomendacje przygotowane dla Ciebie</h2>
        <RecommendationsForYou/>
    </div>
</template>


<script setup lang="ts">
    import FeaturedPlaylists from '@/components/FeaturedPlaylists.vue';
    import RecommendationsForYou from '@/components/RecommendationsForYou.vue';
</script>