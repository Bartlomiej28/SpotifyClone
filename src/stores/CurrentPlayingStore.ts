import { defineStore } from "pinia";

type Track = {
    trackID: string,
    trackName: string,
    trackArtists: string,
    trackThumbnail: string,
    authorID: string
}

export const useCurrentPlayingStore = defineStore('currentPlaying',{
    state : () =>({
        trackID: "" as string,
        trackName: "" as string,
        trackArtists: "" as string,
        trackThumbnail: "" as string,
        authorID: "" as string
    }),
    actions:{
        setCurrentPlayingSong(track: Track){
            this.trackID = track.trackID,
            this.trackName = track.trackName
            this.trackArtists = track.trackArtists,
            this.trackThumbnail = track.trackThumbnail,
            this.authorID = track.authorID
        }
    }
})
