import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { Song } from '@/interfaces';

import { SearchBar } from '@/components/SearchBar';
import { SongsList } from '@/components/SongsList';
import { PlayMusic } from '@/components/PlayMusic';

import { fetchSongOptions } from '@/api';


const ExploreScreen: React.FC = () => {
  const [songOptionName, setSongOptionName] = useState<string>('');
  // const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
    // { title: "amit", 
    //   channel: "laniado", 
    //   url: "dafdaf"
    // });
  const [songsList, setSongsList] = useState<Song[]>([]);

  const handleSongOptionName = (songName: string) => {
    setSongOptionName(songName);
  };

  const handleSelectSong = (song:Song) => {
    setSelectedSong(song);
  };

  const searchSongOptions = async () => {
    if (songOptionName) {
      const songOptions = await fetchSongOptions(songOptionName);
      console.log("searchOptions: ", songOptions);
      setSongsList(songOptions);
    }
  }

  useEffect(() => {
    searchSongOptions();
  }, [songOptionName]);

  useEffect(() => {
    // searchSong();
  }, [selectedSong]);

  return (
    <SafeAreaView style={{ gap: 10 }}>
      { selectedSong ? (
        <PlayMusic song={selectedSong}/>
      ) : (
        <>
          <SearchBar onSongOptionNameChange={handleSongOptionName}/>
          <SongsList list={songsList} onSelectSong={handleSelectSong} />
        </>
      )}
    </SafeAreaView>
  )
}

// const styles = StyleSheet.create({
// });

export default ExploreScreen;
