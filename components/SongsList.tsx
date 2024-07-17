import * as React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { ListItem } from 'react-native-elements';
import { Song } from "@/interfaces";
import { Icon } from 'react-native-elements';

interface SongsListProps {
    list: Song[];
    onSelectSong: (song:Song) => void;
}

export const SongsList: React.FC<SongsListProps> = ({ list = [], onSelectSong }) => {
    if (!Array.isArray(list))
        list = [];

    const showSongProperties = (song: Song) => {

    }
    
    return (
        <View style={styles.container}>
            {
                list.map((song, index) => (
                    <ListItem key={index}
                        bottomDivider 
                        containerStyle={styles.listItem}
                        onPress={() => onSelectSong(song)}    
                    >
                        <ListItem.Content style={styles.listItemContent}>
                            <View>
                                <ListItem.Title style={styles.title}>{ song.title }</ListItem.Title>
                                <ListItem.Subtitle style={styles.subtitle}>{ song.channel }</ListItem.Subtitle>
                            </View>
                            <Pressable onPress={() => showSongProperties(song)}>
                                <Icon
                                    name="ellipsis1"
                                    type="antdesign"
                                    size={30}
                                    iconStyle={styles.menuIcon}
                                />
                            </Pressable>
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
    listItemContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',    
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    subtitle: {
        fontSize: 13,
        color: 'white',
    },
    menuIcon: {
        color: 'white',

    },
});
