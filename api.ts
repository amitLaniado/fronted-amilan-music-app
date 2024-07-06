import axios from 'axios';
import * as FileSystem from 'expo-file-system';
import { user } from "@/models";
import { Song } from "@/interfaces";

// const baseUrl = "http://127.0.0.1:8000";
const baseUrl = "https://backend-amilan-music-app.onrender.com";

export const fetchSongOptions = async (songName: string) => {
    try {
        console.log("search song options for: ", songName);

        const response = await axios.get(`${baseUrl}/song/songOptions/${songName}`);
        return response.data;
    } catch (error) {
        console.error("error: ", error);
    }
}

export const downloadMP3 = async (songUrl: string, fileName: string): Promise<string | null> => {
    const path = `${FileSystem.documentDirectory}${fileName}`;

    try {
      const { uri } = await FileSystem.downloadAsync(`${baseUrl}/song/download/?song_url=${songUrl}`, path);
      console.log('File successfully downloaded:', uri);
      return uri;
    } catch (error) {
      console.error('Download error:', error);
      return null;
    }
}

export const login = async (userName: string, password: string) => {
  try {
    const rawBody: { user_name: string, password: string} = { user_name: userName, password: password };
    const response = await axios.post(
      `${baseUrl}/users/login`, 
      rawBody,
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const register = async (userName: string, email: string, password: string) => {
  try {
    const rawBody: { user_name: string, email: string, password: string} = { user_name: userName, email: email, password: password };
    const response = await axios.post(
      `${baseUrl}/users/register`, 
      rawBody,
    );
    return response.data;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const createPlaylist = async (playlistName: string) => {
  try {
    const rawBody: { playlist_name: string, user_id: number} = { playlist_name: playlistName, user_id: user.getUserId() };
    console.log("rawBody: ", rawBody);
    const response = await axios.post(
      `${baseUrl}/playlists/`, 
      rawBody,
    );
    return response.data.playlist_song_id;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const createSongToPlaylist = async (song: Song, playlistId: number) => {
  try {
    const rawBody: { song_name: string, channel: string, url: string, playlist_id: number} = { song_name: song.title, channel: song.channel, url: song.url, playlist_id: playlistId };
    const response = await axios.post(
      `${baseUrl}/playlists/create_song`, 
      rawBody,
    );
    return response.data.playlist_song_id;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const deleteSongToPlaylist = async (song: Song, playlistId: number) => {
  try {
    const rawBody: { song_name: string, channel: string, url: string, playlist_id: number} = { song_name: song.title, channel: song.channel, url: song.url, playlist_id: playlistId };
    const response = await axios.delete(
      `${baseUrl}/playlists/delete_song`, 
      rawBody,
    );
    return response.data.playlist_song_id;
  } catch (error) {
    console.error("error: ", error);
  }
}

export const fetchPlaylists = async () => {
  try {
    const response = await axios.get(
      `${baseUrl}/playlists/user/${user.getUserId()}`
    );
    console.log("songs: ", response);
    return response.data.playlists;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}

export const fetchPlaylistSongs = async (playlistId: number) => {
  try {
    const response = await axios.get(`${baseUrl}/playlists/${playlistId}`);
    return response.data.songs;
  } catch (error) {
    console.error("error: ", error);
    return [];
  }
}