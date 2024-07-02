import { SafeAreaView, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { PlaylistsList } from '@/components/PlaylistsList';
import { useEffect, useState } from 'react';
import { Playlist } from '@/interfaces';
import { Icon } from 'react-native-elements';
import { ShowPlaylist } from '@/components/ShowPlaylist';
import { fetchPlaylists } from '@/api';

const LibraryScreen = () => {
  // const [playlistList, setPlaylistList] = useState<Playlist[]>([]);
  const [playlistList, setPlaylistList] = useState<Playlist[]>([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  const handleSelectPlaylist = (playlist:Playlist) => {
    setSelectedPlaylist(playlist);
  }

  useEffect(() => {
    const fetchPlaylistsData = async () => {
      const playlists = await fetchPlaylists();
      console.log("playlists: ", playlists);
      setPlaylistList(playlists);
    };

    fetchPlaylistsData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "#181818" }}>
      <View style={styles.headView}>
        <Text style={styles.headTitle}>Your Library</Text>
        <TouchableOpacity> 
          {/* onPress={createPlaylist} */}
          <Icon
            name="add"
            type="Ionicons"
            size={30}
            color="white"
            style={styles.headIcon}
          />
        </TouchableOpacity>
      </View>
      {
        selectedPlaylist ? 
        ( <ShowPlaylist playlist={selectedPlaylist}/>)
        : 
        ( <PlaylistsList list={playlistList} onSelectPlaylist={handleSelectPlaylist} /> )

      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headView: {
    paddingTop: 10,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
  },
  headTitle: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
  },
  headIcon: {
    paddingRight: 10, 
    paddingTop: 7,
  }
});

export default LibraryScreen;