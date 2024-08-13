<template>
  <MainPageView v-if="tokenStore.tokenValue"/>
  <LoginView v-else/>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { useTokenStore } from './stores/tokenStore';
  import LoginView from './views/LoginPageView.vue';
  import MainPageView from './views/MainPageView.vue';

  const tokenStore = useTokenStore()
  
  onMounted(()=>{
    const hash = window.location.hash;
    if(hash){
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');
      if (token) 
        tokenStore.setToken(token);
        if(token !== null){
          localStorage.setItem('token', token)
        }

    }else{
      console.log("Invalid hash")
    }
    console.log("token: "+ tokenStore.tokenValue)
  })

</script>

