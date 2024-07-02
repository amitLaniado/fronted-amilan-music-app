import * as React from "react";
import { View, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements';
import { Song } from "@/interfaces";

interface SongsListProps {
    list: Song[];
    onSelectSong: (song:Song) => void;
}

export const SongsList: React.FC<SongsListProps> = ({ list = [], onSelectSong }) => {
    console.log("I am inside SongsList component. list = ", list);
    if (!Array.isArray(list))
        list = [];
    
    return (
        <View style={styles.container}>
            {
                list.map((song, index) => (
                    <ListItem key={index}
                        bottomDivider 
                        containerStyle={styles.listItem}
                        onPress={() => onSelectSong(song)}    
                    >
                        <ListItem.Content>
                            <ListItem.Title style={styles.title}>{ song.title }</ListItem.Title>
                            {/* <ListItem.Title style={styles.title}>{ song.song_name }</ListItem.Title> */}
                            <ListItem.Subtitle style={styles.subtitle}>{ song.channel }</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: 'black',
    },
    listItem: {
        backgroundColor: 'black',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    subtitle: {
        fontSize: 13,
        color: 'white',
    }
});
