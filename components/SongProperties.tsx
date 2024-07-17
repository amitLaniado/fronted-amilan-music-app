import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Song } from "@/interfaces";
import { Icon } from "react-native-elements";
import { checkIfSongIsLiked } from "@/utils";

interface SongPropertiesProp {
    song: Song;
}

export const SongProperties: React.FC<SongPropertiesProp> = ({ song }) => {
    const [isLike, setIsLike] = useState<boolean>(false);

    useEffect(() => {
        const handleCheckIfSongIsLiked = async () => {
            setIsLike(await checkIfSongIsLiked(song.url));
        }

        handleCheckIfSongIsLiked();
    }, [song.url]);

    // Do it with modal
    return (
        // <Pressable onPress={() => showSongProperties(song)}>
        //     <Icon
        //         name="ellipsis1"
        //         type="antdesign"
        //         size={30}
        //         iconStyle={styles.menuIcon}
        //     />
        // </Pressable>

        <View>
            <Text>{song.title}</Text>
            <Text>{song.channel}</Text>
            <View>
                <Icon 
                    name={isLike ? 'heart' : 'hearto'}
                    type="antdesign"
                    size={30}
                    iconStyle={styles.icon}                
                />
                <Text>{isLike ? "Remove from favorites" : "Add to favorites"}</Text>
            </View>
            <View>
                <Icon 
                    name="ellipsis1"
                    type="antdesign"
                    size={30}
                    iconStyle={styles.icon}                
                />
                <Text>More options</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    icon: {
        // Add your styles here
    }
});
