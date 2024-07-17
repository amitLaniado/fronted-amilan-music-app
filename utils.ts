import { fetchPlaylistSongs } from "./api";
import { Playlist, Song } from "./interfaces";
import { user } from "./models";

export const checkIfSongIsLiked = async (songUrl: string): Promise<boolean> => {
    console.log("in checking");
    const likedSongsPlaylist: Playlist | undefined = user.getPlaylists().find((playlist: Playlist) => playlist.playlist_name === "liked music"); // Provide the appropriate playlist name
    console.log("likedSongsPlaylist: ", likedSongsPlaylist);
    if (likedSongsPlaylist) {
        const likedSongs: Song[] = await fetchPlaylistSongs(likedSongsPlaylist.playlist_id);
        console.log("likedSongs: ", likedSongs);
        return !!likedSongs.find((likedSong: Song) => likedSong.url === songUrl)
    }
    return false;
};

