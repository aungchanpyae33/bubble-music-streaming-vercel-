// "use client";

// import { listSongsSection, SongInfo } from "@/database/data";
// import {
//   currentSongPlaylistAction,
//   DirectPlayBackAction,
//   isFallBackAudioActions,
//   ShouldFetchSongsListIdAction,
//   SongActions,
//   SongFunctionActions,
//   StorePlayListIdStateAction,
//   useDirectPlayBack,
//   useInstantFallBackAudioFull,
//   useRepeatAndCurrentPlayList,
//   useShouldFetchSongsList,
//   useSong,
//   useSongFunction,
//   useStorePlayListId,
// } from "@/lib/zustand";
// import { useEffect } from "react";

// function PlaceHolderTrackInstantPlay({
//   listSong,
//   song,
// }: {
//   listSong: listSongsSection;
//   song: SongInfo;
// }) {
//   const playlistId = listSong.id;
//   const uniUrl = song.id;

//   const FetchSongsListIdAction = useShouldFetchSongsList(
//     (state: ShouldFetchSongsListIdAction) => state.FetchSongsListIdAction
//   );
//   const setIsFallBackAudio = useInstantFallBackAudioFull(
//     (state: isFallBackAudioActions) => state.setIsFallBackAudio
//   );
//   // for current playlist(id and song currentSongUrl as to know for directplayback button)
//   const setPlaylistId = useStorePlayListId(
//     (state: StorePlayListIdStateAction) => state.setPlaylistId
//   );

//   const setPlay = useSongFunction(
//     (state: SongFunctionActions) => state.setPlay
//   );
//   const setPlayListArray = useRepeatAndCurrentPlayList(
//     (state: currentSongPlaylistAction) => state.setPlayListArray
//   );
//   const updateSongCu = useSong((state: SongActions) => state.updateSongCu);

//   const setPlayList = useDirectPlayBack(
//     (state: DirectPlayBackAction) => state.setPlayList
//   );

//   useEffect(() => {
//     setIsFallBackAudio(); //dynamic import
//     setPlayListArray({
//       [playlistId || ""]: listSong,
//     });
//     FetchSongsListIdAction(playlistId);
//     const data = {
//       [uniUrl || ""]: song.url,
//       sege: song.sege,
//       duration: song.duration,
//       name: song.name,
//       song_time_stamp: song.song_time_stamp,
//       id: song.id,
//       song_id: song.song_id,
//       is_liked: song.is_liked,
//       artists: song.artists,
//       is_lyric: song.is_liked,
//     };
//     updateSongCu(data);
//     setPlaylistId({
//       [playlistId || ""]: [playlistId, song.id],
//     });
//     setPlayList(playlistId || "", true);
//     setPlay(uniUrl || "", true);
//   }, [
//     FetchSongsListIdAction,
//     playlistId,
//     listSong,
//     setPlay,
//     setPlayList,
//     setPlayListArray,
//     setPlaylistId,
//     song,
//     uniUrl,
//     updateSongCu,
//     setIsFallBackAudio,
//   ]);
//   return null;
// }

// export default PlaceHolderTrackInstantPlay;
