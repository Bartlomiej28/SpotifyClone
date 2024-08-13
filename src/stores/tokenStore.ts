import { defineStore } from "pinia";

export const useTokenStore = defineStore('token',{
    state : () =>({
        tokenValue: null as string | null
    }),
    actions:{
        getToken(){
            return this.tokenValue
        },

        setToken(token : string){
            this.tokenValue = token
        }
    }
})

/*

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})
*/