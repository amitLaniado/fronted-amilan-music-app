import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
// import { downloadMP3, addSongToPlaylist } from '@/api';
import { downloadMP3 } from '@/api';
import { Audio } from 'expo-av';

import Slider from '@react-native-community/slider';

import * as Font from 'expo-font';

import { Song } from "@/interfaces";

interface PlayMusicInterface {
    song: Song
}

export const PlayMusic:React.FC<PlayMusicInterface> = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [sound, setSound] = useState<Audio.Sound | null>(null);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);

    useEffect(() => {
        const onCreateComponent = async () => {
            console.log("selectSong from explore screen PlayMusic component: ", song);
            if (song) {
                const path = await downloadMP3(song.url, 'sample.mp3');
                console.log("path: ", path);
                if (path) {
                    playMP3(path);
                }
            }
        }

        onCreateComponent();
    }, [song]);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                Oswald: require('../assets/fonts/Oswald-Bold.ttf'),
                // Dosis: require('../assets/fonts/Dosis-Light.ttf'),
            });
        };
        
        loadFonts();
    }, [])

    const getAudioPermissions = async () => {
        const { status } = await Audio.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('Audio permission is required!');
            return false;
        }
        return true;
    };
        
    const playMP3 = async (filePath: string): Promise<void> => {

        const hasPermission = await getAudioPermissions();
        if (!hasPermission) {
            console.log("hasPermission = ", hasPermission);
            return
        };
    
        console.log("playMP3 filePath = ", filePath)
    
        await Audio.setAudioModeAsync({
            // allowsRecordingIOS: false,
            allowsRecordingIOS: true,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });

        try {    
            const { sound: newSound } = await Audio.Sound.createAsync({ uri: filePath });
            setSound(newSound);
            const status = await newSound.getStatusAsync();
            if (status.isLoaded) {
                setDuration(status.durationMillis || 0);
            }

            newSound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded) {
                    setCurrentPosition(status.positionMillis);
                    if (status.didJustFinish) {
                        setIsPlaying(false);
                        newSound.unloadAsync();
                    }
                }
            });
    
            await newSound.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error("Error playing sound:", error);
        }
    };

    const togglePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleAddSongToPlaylist = (playlistName: string) => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.showTimesView}>
                <View>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songChannel}>{song.channel}</Text>
                </View>
                <TouchableOpacity onPress={() => setIsLike(!isLike)}>
                    <Icon
                        name={isLike ? 'heart' : 'hearto'}
                        type="antdesign"
                        size={30}
                        iconStyle={styles.likeIcon}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.showTimesView}>
                <Text style={styles.showTimesTexts}>{ formatTime(currentPosition) }</Text>
                <Text style={styles.showTimesTexts}>{ formatTime(duration) }</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={duration}
                value={currentPosition}
                onValueChange={(val) => sound && sound.setPositionAsync(val)}
                minimumTrackTintColor="rgb(0, 150, 0)"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="rgb(0, 130, 0)"
            />

            <TouchableOpacity onPress={togglePlayPause}>
                <Icon
                    name={isPlaying ? 'pause' : 'play-arrow'}
                    size={40}
                    color="white"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        // height: 40,
        marginHorizontal: 10,
    },
    songTitle: {
        fontFamily: "Oswald",
        fontSize: 30,
        color: "#fff",
    },
    songChannel: {
        // fontFamily: "Dosis",
        fontSize: 15,
        color: "#ababab",
    },
    likeIcon: {
        marginTop: 10,
        marginRight: 10,
        color: "rgb(0, 150, 0)",
    },
    showTimesView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        // marginHorizontal: 5,
    },
    showTimesTexts: {
        color: "white",
    },
    slider: {
        // paddingTop: -10,
        marginTop: -5
        // marginHorizontal: 5
    },
  });
  