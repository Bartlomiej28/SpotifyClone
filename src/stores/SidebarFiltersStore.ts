import { defineStore } from 'pinia'

export const useSidebarFilterStore = defineStore('sidebarfilter',{
  state : () => ({
    sidebarFilterValue: "playlists"
  }),
  actions:{
    changeSidebarFilter(newFilter : string){
      this.sidebarFilterValue = newFilter
    }
  }
})
