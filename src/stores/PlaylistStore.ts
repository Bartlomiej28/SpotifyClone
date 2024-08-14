import { defineStore } from 'pinia'

export const usePlaylistStore = defineStore('playlistStore', {
  state: () => ({
    playlistIDValue: "",
    showAddToPlaylistWindow: false,
    songURI: ""
  }),
  actions: {
    setPlaylistIDValue(newID: string) {
      this.playlistIDValue = newID;
    },
    toggleAddToPlaylistWindow() { 
      this.showAddToPlaylistWindow = !this.showAddToPlaylistWindow;
    },
    setSongUri(newURI: string){
      this.songURI = newURI
    }
  }
})
