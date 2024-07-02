import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements';
import { Playlist } from "@/interfaces";

interface PlaylistsListProps {
    list: Playlist[];
    onSelectPlaylist: (playlist: Playlist) => void;
}

export const PlaylistsList: React.FC<PlaylistsListProps> = ({ list = [], onSelectPlaylist }) => {
    if (!Array.isArray(list))
        list = [];
    
    return (
        <View style={styles.container}>
            {
                list.map((playlist, index) => (
                    <ListItem key={index}
                        bottomDivider 
                        containerStyle={styles.listItem}
                        onPress={() => onSelectPlaylist(playlist)}    
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>{ playlist.playlist_name }</ListItem.Title>
                            {/* <ListItem.Subtitle style={styles.songsAmount}>{ playlist.songsAmount }</ListItem.Subtitle> */}
                            <ListItem.Subtitle style={styles.songsAmount}>3 songs</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
    },
    listItem: {
        backgroundColor: 'black',
    },
    title: {
        fontSize: 23,
        fontWeight: '500',
        color: 'white'
    },
    songsAmount: {
        fontSize: 15,
        fontWeight: '100',
        color: '#A3A3A3',
    },
});
