import { Playlist, Song } from "@/interfaces"
import React, { useEffect, useState } from "react";
import { SongsList } from "./SongsList";
import { StyleSheet, Pressable, View, Text } from "react-native";
import { fetchPlaylistSongs } from "../api"
import { PlayMusic } from "./PlayMusic";
import SongBuffer from "@/song_hundle/SongBuffer";

interface ShowPlaylistProps {
    playlist: Playlist;
}

export const ShowPlaylist: React.FC<ShowPlaylistProps> = ({ playlist }) => {
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]); 
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const songs = await fetchPlaylistSongs(playlist.id);
            setPlaylistSongs(songs);
        };

        fetchData();
    }, []);
    
    const handleSelectSong = (song:Song) => {
        setSelectedSong(song);
    };
    
    return (
        <View>
            { selectedSong ? (
                <>
                    {/* <Pressable this should be inside the PlayMusic component. 
                        onPress={() => setSelectedSong(null)}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.cancelButtonText}>X</Text>
                    </Pressable> */} 
                    <PlayMusic songBuffer={new SongBuffer(playlistSongs, playlistSongs.findIndex(song => song.title === selectedSong.title))}/>
                </>
            ) : (
                <SongsList list={playlistSongs} onSelectSong={handleSelectSong}/>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    cancelButton: {
        width: 40,
        borderRadius: 50,
        backgroundColor: "red",
        padding: 4,
        position: "absolute",
        right: 60,
        zIndex: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
    },    
})