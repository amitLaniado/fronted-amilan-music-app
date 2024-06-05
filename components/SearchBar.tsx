import * as React from "react";
import { Searchbar } from "react-native-paper";
import { StyleSheet } from 'react-native';

interface SearchBarProps {
  onSongOptionNameChange: (songName: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSongOptionNameChange }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSubmitEditing = () => {
    console.log("onSubmitEditing searchQuery:", searchQuery);
    onSongOptionNameChange(searchQuery);
  }

  return (
    <Searchbar
      placeholder="Search Song"
      onChangeText={(query) => setSearchQuery(query)}
      // onEndEditing={handleEndEditing}
      onSubmitEditing={handleSubmitEditing}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
});
