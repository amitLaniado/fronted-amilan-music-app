import { Song } from "../interfaces";
import SongPlayer from "./SongPlayer";
import { downloadMP3 } from "../api";

class SongBuffer {
    private songs: Song[];
    private songPlayer: SongPlayer | null = null;
    private currentIndex: number;
    private savedPaths: Record<string, string> = {}; // <url, path>

    constructor (songs: Song[], currentIndex: number) {
        this.songs = songs;
        this.currentIndex = currentIndex;
    }

    public playCurrentSong(): void {
        // had to load song before play it.
        // const currentSong: Song = this.songs[this.currentIndex];
        const currSongPath = this.savedPaths[this.getCurrentSong().url];
        this.songPlayer = new SongPlayer(currSongPath);
        this.songPlayer.play();
        // this.songPlayer.play(this.savedPaths[currentSong.url]);
    }

    public async loadSong(index: number): Promise<void> { // return the path to the load song
        try {
            // const song = this.songs[index];
            // this.savedPaths[song.url] = (await downloadMP3(this.songs[index].url, 'sample.mp3')) ?? "";
            const currSongUrl = this.getCurrentSong().url;
            this.savedPaths[currSongUrl] = (await downloadMP3(currSongUrl, 'sample.mp3')) ?? "";
        } catch (error) {
            console.error("Error load song:", error);
        }
    }

    public addSong (song: Song): void {
        this.songs.push(song);
    }
    
    public removeSong(indexToRemove: number) {
        this.songs.splice(indexToRemove, 1);
    }
    
    public getSongPlayer(): SongPlayer | null {
        return this.songPlayer;
    }

    public getCurrentSong(): Song {
        return this.songs[this.currentIndex];
    }

    public getSongs(): Song[] {
        return this.songs;
    }

    public setCurrentIndex(currentIndex: number) {
        this.currentIndex = currentIndex;
    }

    public getCurrentIndex() {
        return this.currentIndex;
    }

    public nextSong() {
        this.currentIndex++;
    }
}

export default SongBuffer;