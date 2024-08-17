import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebarfilter',{
  state : () => ({
    sidebarFilterValue: "playlists",
    showSidebar: false
  }),
  actions:{
    changeSidebarFilter(newFilter : string){
      this.sidebarFilterValue = newFilter
    },
    showHideSidebar(){
      this.showSidebar = !this.showSidebar
    }

  }
})
