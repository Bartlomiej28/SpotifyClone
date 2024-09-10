<template>
    <div class="w-full h-screen flex justify-center items-center relative">

      <div 
        class="w-full h-full absolute top-0 left-0 bg-cover bg-center blur-sm bg-[url('https://community.spotify.com/t5/image/serverpage/image-id/104663iE4B9E37436B66D15/image-size/large?v=v2&px=999')]">
      </div>

       <div class="w-full md:w-8/12 h-screen md:h-4/5 bg-[#121212] text-white p-4 z-10 flex flex-col items-center">
        <div class="flex justify-center p-2">
          <i class="bx bxl-spotify text-4xl"></i>
          <span class="logo-name text-xl flex items-center ml-2">Spotify</span>
        </div>
        <h2 class="text-2xl mb-4 flex flex-col gap-2">
          Zaloguj się, aby kontynuować.
        </h2>
        <p class="w-full text-center">Zaloguj się za pomocą tych danych.</p>
        <p class="w-full h-auto text-wrap text-center">
          Login/Email: portfolio.bartlomiej.boczylo@gmail.com
        </p>
        <p class="w-full text-center">Hasło: Sp0tify12*</p>
        <p class="text-center mb-4 mt-4 font-bold">
          Zaloguj się wykonując poniższe kroki:
        </p>
        <div class="w-full flex flex-col">
          <p class="w-full h-auto text-wrap">
            1. Otwórz prawdziwą aplikację Spotify w innym oknie przeglądarki
          </p>
          <p class="">
            2. W prawdziwej aplikacji Spotify zaloguj się za pomocą powyższych
            danych i włącz muzykę.
          </p>
          <p>3. Wróć do tej aplikacji i kliknij przycisk "Zaloguj się"</p>
        </div>
        <button class="bg-green-500 mt-8 rounded-full px-8 py-2">
          Zaloguj się
        </button>
      </div>
    </div>
  </template>

<script setup lang="ts">

    const handleLogin = async() =>{
        const client_id = '44a574db50b94b0fac2798b8fc3c2a25';
        const redirectUrl = 'https://spotify-clone-xi-drab.vercel.app/';
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
