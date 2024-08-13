import { defineStore } from "pinia";

export const usePlayerState = defineStore('player',{
    state : () =>({
        playerStateValue: false
    }),
    actions:{
       changePlayerState(){
        this.playerStateValue = !this.playerStateValue
       }
    }
})