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

