import { defineStore } from "pinia";


export const useAlretWindowStore = defineStore('alertWindow',{
    state : () =>({
        showAlertWindow: false,
        text: " "
    }),
    actions:{
        ShowAlertWindow(newText: string){
           this.showAlertWindow = true
           this.text = newText
        },
        HideAlertWindow(){
            this.showAlertWindow = false
        }
    }
})