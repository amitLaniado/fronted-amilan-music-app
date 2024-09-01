import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from 'react-native-elements';
import { createSongToPlaylist, deleteSongToPlaylist } from '@/api';
import Slider from '@react-native-community/slider';
import * as Font from 'expo-font';
import { Song } from "@/interfaces";
import { user } from "@/User";
import { checkIfSongIsLiked } from "@/utils";
import SongPlayer from "../SongPlayer";

interface PlayMusicInterface {
    song: Song;
}

export const PlayMusic: React.FC<PlayMusicInterface> = ({ song }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isLike, setIsLike] = useState<boolean>(false);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [songPlayer, setSongPlayer] = useState<SongPlayer | null>(null);

    useEffect(() => {
        const onCreateComponent = async () => {
            if (song) {
                const player = new SongPlayer(song);
                setSongPlayer(player);
            }
        };

        const handleCheckIfSongIsLiked = async () => {
            setIsLike(await checkIfSongIsLiked(song.url));
        };

        handleCheckIfSongIsLiked();
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
    }, []);

    useEffect(() => {
        if (songPlayer) {
            const interval = setInterval(() => {
                setCurrentPosition(songPlayer.getCurrentPosition());
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [songPlayer]);

    const formatTime = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const getLikePlaylistId = () => {
        const likePlaylist = user.getPlaylists().find(playlist => playlist.playlist_name == 'liked music');
        return likePlaylist?.playlist_id ?? null;
    };

    const addOrDeleteSongToLikeSongsPlaylist = () => {
        const likePlaylistId = getLikePlaylistId();
        
        if (!likePlaylistId) {
            return console.error('Liked music playlist not found');
        }

        const action = isLike ? deleteSongToPlaylist : createSongToPlaylist;
        action(song, likePlaylistId);
        setIsLike(!isLike);
    };

    const togglePlayPause = () => {
        if (songPlayer) {
            songPlayer.stop();
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.showTimesView}>
                <View>
                    <Text style={styles.songTitle}>{song.title}</Text>
                    <Text style={styles.songChannel}>{song.channel}</Text>
                </View>
                <TouchableOpacity onPress={addOrDeleteSongToLikeSongsPlaylist}>
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
                <Text style={styles.showTimesTexts}>{ formatTime(songPlayer?.getDuration() ?? 0) }</Text>
            </View>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={songPlayer?.getDuration() ?? 0}
                value={currentPosition}
                onValueChange={(val) => songPlayer && songPlayer.setSoundPos(val)}
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
    },
    showTimesTexts: {
        color: "white",
    },
    slider: {
        // paddingTop: -10,
        marginTop: -5,
        // marginHorizontal: 5
    },
});
