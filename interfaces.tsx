export interface Song {
    title: string;
    // song_name: string;
    channel: string;
    url: string;
}

export interface Playlist {
    playlist_id: number;
    playlist_name: string;
    songs_amount: number;
}

// export interface UserLogin {
//     user_name: string;
//     password: string;
// }