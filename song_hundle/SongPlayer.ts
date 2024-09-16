import { Audio } from "expo-av";
import { Song } from "../interfaces";

class SongPlayer {
    // private song: Song;
    private sound: Audio.Sound | null = null;
    private isPlaying: boolean = false;
    private currentPosition: number = 0;
    private duration: number = 0;
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.initialize();
    }

    private async initialize() {
        const hasPermission = await this.getAudioPermissions(); // TODO: only when the application is opned, the application would ask for permissions. 
        if (!hasPermission) return;

        await this.configAudioMode();
        await this.setupAudio();

    }

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

    private async loadAudio(): Promise<Audio.Sound | null> {
        try {
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: this.filePath });
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

    private async setupAudio(): Promise<void> {
        const newSound = await this.loadAudio();
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

    public async play() {
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
