export const dynamic = "force-dynamic";
import { getSearchPage } from "@/database/data";
import SearchAlbum from "@/ui/searchPage/SearchAlbum";
import SearchArtist from "@/ui/searchPage/SearchArtist";
import SearchPlaylist from "@/ui/searchPage/SearchPlaylist";
import SearchProfile from "@/ui/searchPage/SearchProfile";
import SearchSongs from "@/ui/searchPage/SearchSongs";
import TopResult from "@/ui/searchPage/topResult/TopResult";
import React from "react";

async function page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const { data, error } = await getSearchPage(query);

  if (!data || error) return null;
  const { top_result, songs, albums, artists, playlists, profiles } = data;

  return (
    <div className="  space-y-5">
      <h1 className="p-2">Search results for {`"${query}"`}</h1>
      {top_result && <TopResult topResult={top_result} />}
      {songs && songs.idArray.length > 0 && (
        <SearchSongs songs={songs} title="Song" />
      )}

      {artists && artists.idArray.length > 0 && (
        <SearchArtist title="Artist" artists={artists} />
      )}
      {albums && albums.idArray.length > 0 && (
        <SearchAlbum title="Albums" albums={albums} />
      )}
      {playlists && playlists.idArray.length > 0 && (
        <SearchPlaylist title="Playlist" playlists={playlists} />
      )}

      {profiles && profiles.idArray.length > 0 && (
        <SearchProfile title="Profiles" profiles={profiles} />
      )}
    </div>
  );
}
export default page;
