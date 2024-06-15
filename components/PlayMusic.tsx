import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from '@rneui/themed';  // Provides access to various icon sets
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

    // useEffect(() => {
    //     const onCreateComponent = async () => {
    //         console.log("selectSong from explore screen PlayMusic component: ", song);
    //         if (song) {
    //             const path = await downloadMP3(song.url, 'sample.mp3');
    //             console.log("path: ", path);
    //             if (path) {
    //                 playMP3(path);
    //             }
    //         }
    //     }

    //     onCreateComponent();
    // }, [song]);

    useEffect(() => {
        const loadFonts = async () => {
            await Font.loadAsync({
                Oswald: require('../assets/fonts/Oswald-Bold.ttf'),
                // Dosis: require('../assets/fonts/Dosis-Light.ttf'),
            });
        };
        
        loadFonts();
    }, [])

    const playMP3 = async (filePath: string): Promise<void> => {
        const { sound } = await Audio.Sound.createAsync({ uri: filePath });
    
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
            console.log('Successfully finished playing');
            sound.unloadAsync();
            }
        });
        
        await sound.playAsync();
        setIsPlaying(true);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.songTitle}>{song.title}</Text>
            <Text style={styles.songChannel}>{song.channel}</Text>
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
                minimumTrackTintColor="#57ad18"
                maximumTrackTintColor="#d3d3d3"
                thumbTintColor="#65ad31"
            />

            <TouchableOpacity onPress={() => setIsPlaying(!isPlaying)}>
                <Icon
                    name={isPlaying ? 'pause' : 'play-arrow'} // Use appropriate icons from your icon library
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
        marginTop: -10
        // marginHorizontal: 5
    },
  });
  