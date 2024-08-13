<template>
    <tr class="border-none hover:bg-[#2a2a2a] duration-300 cursor-pointer">
        <td>
                {{ props.number }}
        </td>
        <td>
            <div class="flex items-center gap-3">
                <div class="avatar">
                <div class="mask mask-squircle h-12 w-12">
                    <img
                    :src="props.image"
                    alt="Avatar Tailwind CSS Component" />
                </div>
                </div>
                <div>
                <div class="font-bold">{{ props.title }}</div>
                <div class="text-sm opacity-50">{{ props.author.toString() }}</div>
                </div>
            </div>
        </td>
        <td> {{ props.album }}</td>
        <td> {{ msToMinutes(props.duration) }}</td>
        
    </tr>
</template>

<script setup lang="ts">

    const props = defineProps(["id", "image", "title", "author", "album", "duration", "number"]);

   
    const msToMinutes = (ms: number) =>{
        const minutes = Math.floor(ms/60000);
        const seconds = ((ms%60000)/1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }


</script>