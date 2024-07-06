import { SafeAreaView, Text, View, StyleSheet, Pressable, Modal, TouchableOpacity, TextInput } from 'react-native';
import { PlaylistsList } from '@/components/PlaylistsList';
import { useState } from 'react';
import { Playlist } from '@/interfaces';
import { Icon } from 'react-native-elements';
import { ShowPlaylist } from '@/components/ShowPlaylist';
import { user } from '@/models';
import { createPlaylist } from '@/api';

const LibraryScreen = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [playlistName, setPlaylistName] = useState<string>(""); 

  // const openModal = () => {
  //   setModalVisible(true);
  // };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleCreatePlaylist = () => {
    playlistName !== "" && createPlaylist(playlistName);
  }

  const handleSelectPlaylist = (playlist:Playlist) => {
    setSelectedPlaylist(playlist);
  }

  return (
    <SafeAreaView>
      <View style={styles.headView}>
        <Text style={styles.headTitle}>Your Library</Text>
        <Pressable 
          onPress={() => setModalVisible(true)}
        >
          <Icon
            name="add"
            type="Ionicons"
            size={30}
            color="white"
            style={styles.headIcon}
          />
        </Pressable>
      </View>
      {
        selectedPlaylist ? 
        ( <ShowPlaylist playlist={selectedPlaylist}/>)
        : 
        ( <PlaylistsList list={user.getPlaylists()} onSelectPlaylist={handleSelectPlaylist} /> )

      }
      {
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Create a new playlist</Text>
              
              <TextInput style={styles.input} placeholder='Playlist name' placeholderTextColor="gray"
                value={playlistName} onChangeText={setPlaylistName} autoCorrect={false} autoCapitalize='none'/>
            
              <Pressable style={styles.button} onPress={handleCreatePlaylist}>
                  <Text style={styles.buttonText}>create playlist</Text>
              </Pressable>

              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headView: {
    backgroundColor: "#181818",
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
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#B3B3B3',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  closeText: {
    color: 'black',
    fontSize: 16,
    marginTop: 10,
  },
  input : {
    width: 150,
    height: 50,
    paddingLeft: 10,
    // paddingEnd: 100,
    borderRadius: 40,
    backgroundColor: "#fff",
    color: "grey",
  },
  button : {
    marginTop: 10,
    backgroundColor: "rgb(0, 150, 0)",
    height: 45,
    borderRadius: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText : {
      color : "white",
      fontSize: 16,
      fontWeight : "700"
  }, 
});

export default LibraryScreen;