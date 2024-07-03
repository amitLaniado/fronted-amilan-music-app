import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
// import { downloadMP3, addSongToPlaylist } from '@/api';
import { downloadMP3 } from '@/api';
import { Audio } from 'expo-av';

import Slider from '@react-native-community/slider';

import * as Font from 'expo-font';
// import { AppLoading } from 'expo-app-loading';

import { Song } from "@/interfaces";

interface PlayMusicInterface {
    song: Song
}

export const PlayMusic:React.FC<PlayMusicInterface> = ({ song }) => {
    const [songTime, setSongTime] = useState<number | undefined>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);

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
            allowsRecordingIOS: false,
            staysActiveInBackground: true,
            // interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            // interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });

        try {
            // const remoteUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            // const { sound } = await Audio.Sound.createAsync({ uri: remoteUrl });
            const { sound } = await Audio.Sound.createAsync({ uri: filePath });
    
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    console.log('Successfully finished playing');
                    sound.unloadAsync();
                }
            });
    
            await sound.playAsync();
            setIsPlaying(true);
        } catch (error) {
            console.error("Error playing sound:", error);
        }
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
                        // color="white"
                        iconStyle={styles.likeIcon}
                    />
                    {/* <MaterialIcons
                        name={isLike ? 'heart' : 'hearto'}
                        size={40}
                        color="white"
                    /> */}
                </TouchableOpacity>
            </View>
            <View style={styles.showTimesView}>
                <Text style={styles.showTimesTexts}>3:50</Text>
                <Text style={styles.showTimesTexts}>{ songTime }</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={100}
                step={1}
                value={songTime}
                onValueChange={(val) => val && setSongTime(val)}
                // minimumTrackTintColor="#57ad18"
                // maximumTrackTintColor="#d3d3d3"
                // thumbTintColor="#65ad31"
                minimumTrackTintColor="rgb(0, 150, 0)"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="rgb(0, 130, 0)"
            />

            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
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
  