import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';

import { SearchBar } from '@/components/SearchBar';
import { SongsList } from '@/components/SongsList';

import { fetchSongOptions } from '@/api';

interface Song {
  title: string;
  artist: string;
}

// let songslist:Song[] = [
//   {
//     title: 'sha-boom',
//     artist: 'The Chords'
//   },
//   {
//     title: "Can't Stop",
//     artist: 'Red Hot Chili Peppers'
//   },
//   {
//     title: 'Never Gonna Give You Up',
//     artist: 'Rick Astley'
//   },
// ]

const ExploreScreen = () => {
  const [songOptionName, setSongOptionName] = useState<string>('');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [songsList, setSongsList] = useState<Song[]>([]);

  const handleSongOptionName = (songName: string) => {
    setSongOptionName(songName);
  };

  const handleSelectSong = (song:Song) => {
    setSelectedSong(song);
  };

  const searchSongOptions = async () => {
    const songOptions = await fetchSongOptions(songOptionName);
    console.log("searchOptions: ", songOptions);
    setSongsList(songOptions);
  }

  const searchSong = () => {
    console.log("selectSong from explore screen: ", selectedSong);
  }

  useEffect(() => {
    searchSongOptions();
  }, [songOptionName]);

  useEffect(() => {
    searchSong();
  }, [selectedSong]);

  return (
    <SafeAreaView style={{ gap: 10 }}>
      <SearchBar onSongOptionNameChange={handleSongOptionName}/>
      <SongsList list={songsList} onSelectSong={handleSelectSong} />
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
// });

export default ExploreScreen;
