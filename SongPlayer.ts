import { Audio } from "expo-av";
import { Song } from "./interfaces";

class SongPlayer {
    private song: Song;
    private sound: Audio.Sound | null = null;
    private isPlaying: boolean = false;
    private currentPosition: number = 0;
    private duration: number = 0;
    // private path: string | null = null;

    constructor(song: Song) {
        this.song = song;
        // this.initialize();
    }

    // private async initialize() {
    //     try {
    //         this.path = await downloadMP3(this.song.url, 'sample.mp3');
    //         if (this.path) {
    //             await this.play(this.path);
    //         }
    //     } catch (error) {
    //         console.error("Error initializing SongPlayer:", error);
    //     }
    // }

    private async getAudioPermissions(): Promise<boolean> {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Audio permission is required!');
            return false;
        }
        return true;
    }

    private async configAudioMode(): Promise<void> {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });
    }

    private async loadAudio(filePath: string): Promise<Audio.Sound | null> {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: filePath });
            const status = await newSound.getStatusAsync();
            if (status.isLoaded) {
                this.duration = status.durationMillis || 0;
                return newSound;
            }
            return null;
        } catch (error) {
            console.error("Error loading sound:", error);
            return null;
        }
    }

    private async setupAudio(filePath: string): Promise<void> {
        const newSound = await this.loadAudio(filePath);
        if (newSound) {
            this.sound = newSound;
            this.sound?.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    this.currentPosition = status.positionMillis;
                    if (status.didJustFinish) {
                        this.isPlaying = false;
                        this.sound?.unloadAsync();
                    }
                }
            });
        }
    }

    public async play(filePath: string) {
        const hasPermission = await this.getAudioPermissions();
        if (!hasPermission) return;

        await this.configAudioMode();
        await this.setupAudio(filePath);

        try {
            await this.sound?.playAsync();
            this.isPlaying = true;
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    }

    public async stop() {
        if (this.sound) {
            if (this.isPlaying) {
                await this.sound.pauseAsync();
            } else {
                await this.sound.playAsync();
            }
            this.isPlaying = !this.isPlaying;
        }
    }

    public setSoundPos(val: number) {
        this.sound?.setPositionAsync(val);
        this.currentPosition = val;
    }

    public getCurrentPosition(): number {
        return this.currentPosition;
    }
    
    public getDuration(): number {
        return this.duration;
    }
}

export default SongPlayer;
