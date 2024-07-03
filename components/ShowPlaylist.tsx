import { Playlist, Song } from "@/interfaces"
import React, { useEffect, useState } from "react";
import { SongsList } from "./SongsList";
import { View } from "react-native";
import { fetchPlaylistSongs } from "../api"
import { PlayMusic } from "./PlayMusic";

interface ShowPlaylistProps {
    playlist: Playlist;
}

export const ShowPlaylist: React.FC<ShowPlaylistProps> = ({ playlist }) => {
    const [playlistSongs, setPlaylistSongs] = useState<Song[]>([]); 
    const [selectedSong, setSelectedSong] = useState<Song | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const songs = await fetchPlaylistSongs(playlist.playlist_id);
            setPlaylistSongs(songs);
        };

        fetchData();
    }, []);
    
    // getPlaylistSongs(playlist.playlist_id);

    const handleSelectSong = (song:Song) => {
        setSelectedSong(song);
    };
    
    return (
        <View>
            { selectedSong ? (
                <PlayMusic song={selectedSong}/>
            ) : (
                <SongsList list={playlistSongs} onSelectSong={handleSelectSong}/>
            )}
        </View>
    )

}