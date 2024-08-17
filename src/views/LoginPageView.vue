<template>
    <div class="w-full h-screen flex justify-center items-center relative">

      <div 
        class="w-full h-full absolute top-0 left-0 bg-cover bg-center blur-sm bg-[url('https://community.spotify.com/t5/image/serverpage/image-id/104663iE4B9E37436B66D15/image-size/large?v=v2&px=999')]">
      </div>

      <div class="w-8/12 h-2/5 bg-[#121212] text-white p-4 z-10 flex flex-col items-center">
        <div class="flex justify-center p-2">
          <i class="bx bxl-spotify text-4xl"></i>
          <span class="logo-name text-xl flex items-center ml-2">Spotify</span>
        </div>
        <h2 class="text-2xl">Zaloguj się, aby kontynuować.</h2>
        <button class="bg-green-500 mt-32 rounded-full px-8 py-2" @click="handleLogin">Zaloguj się</button>
      </div>
    </div>
  </template>

<script setup lang="ts">

    const handleLogin = async() =>{
        const client_id = '6c1ba004893b4b3a8533ef45c1269a1a';
        const redirectUrl = 'spotify-clone-xi-drab.vercel.app';
        const apiUrl = 'https://accounts.spotify.com/authorize';
        const response_type = 'code';
        const scope = ['user-read-email', 
                        'user-read-private',
                        'user-modify-playback-state', 
                        'user-read-playback-state', 
                        'user-read-currently-playing',
                        'user-read-recently-played',
                        'user-read-playback-position',
                        'user-top-read',
                        'user-library-read',
                        'user-follow-read',
                        'user-library-modify',
                        'playlist-modify-public',
                        'playlist-modify-private',
                        'user-follow-modify'];
        window.location.href = `${apiUrl}?&client_id=${client_id}&redirect_uri=${redirectUrl}&scope=${scope.join(" ")}&response_type=token&show_daialog=true`;
    }
</script>