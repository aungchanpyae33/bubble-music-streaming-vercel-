import { getUserPage } from "@/database/data";
import AlbumUpperBackground from "@/ui/albumContainer/AlbumUpperBackground";
import Container from "@/ui/albumContainer/Container";
import ListContainer from "@/ui/general/ListContainerOption/ListContainer";
import ProfileOption from "@/ui/general/optionBox/ProfileOption";
import ContextSongListContainer from "@/ui/playlist/playlistOption/ContextSongListContainer";
import MoreOption from "@/ui/trackComponent/MoreOption";
import MoreOptionContext from "@/ui/trackComponent/MoreOptionContext";
import UserUpperContainer from "@/ui/user/UserUpperContainer";
async function page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;

  const { data, error } = await getUserPage(params.slug);
  if (!data || error) return;

  const { playlists, profile } = data;

  if (!playlists || !profile) return;
  return (
    <div className=" w-full">
      <AlbumUpperBackground>
        <UserUpperContainer profile={profile} />
      </AlbumUpperBackground>

      <ListContainer className="h-[50px]">
        <div>
          <ContextSongListContainer
            id={profile.id}
            name={profile.name}
            type={profile.type}
            source={profile.source}
            isPage={true}
          >
            <MoreOptionContext>
              <MoreOption targetElement={<ProfileOption />} />
            </MoreOptionContext>
          </ContextSongListContainer>
        </div>
      </ListContainer>

      {playlists && (
        <Container songs={playlists} description="Public Playlist" />
      )}
    </div>
  );
}

export default page;
