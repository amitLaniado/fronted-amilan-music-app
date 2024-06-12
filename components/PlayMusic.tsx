import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { downloadMP3 } from '@/api';
import { Audio } from 'expo-av';

import { Song } from "@/interfaces";

interface PlayMusicInterface {
    song: Song
}

export const PlayMusic:React.FC<PlayMusicInterface> = ({ song }) => {
    const [songTime, setSongTime] = useState<number | [number, number]>(0);

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

    const playMP3 = async (filePath: string): Promise<void> => {
        const { sound } = await Audio.Sound.createAsync({ uri: filePath });
    
        sound.setOnPlaybackStatusUpdate((status) => {
            if (status.isLoaded && status.didJustFinish) {
            console.log('Successfully finished playing');
            sound.unloadAsync();
            }
        });
        
        await sound.playAsync();
    };      

    return (
        <View>
            <Text>Hii</Text>
            <Text>Hello</Text>
        </View>
    );
}