import { StyleSheet } from 'react-native';
import { Card, Track as TrackType } from '@/types';
import { Text } from '@/components/Themed';
import { AnthemView } from '@/components/Core';
import { TrackPost } from '@/components/Posts'

export default function TimelineFeed() {
  // const ws = useRef<WebSocket | null>(null);
  // const [trackUri, setTrackUri] = useState<string | null>(null);
  // const [alubmUri, setAlbumUri] = useState<string | null>(null);

  // useEffect(() => {
  //   ws.current = new WebSocket("wss://wda44qensj.execute-api.us-east-1.amazonaws.com/development?userId=schreineravery-us");
  //   ws.current = new WebSocket("wss://wda44qensj.execute-api.us-east-1.amazonaws.com/production?userId=schreineravery-us");

  //   ws.current.onopen = () => {
  //     console.log("Connected!");
  //   }

  //   ws.current.onmessage = (e) => {
  //     console.log("Message:\n" + e.data);
  //     var status: Status = JSON.parse(e.data);
  //     setTrackUri(status.track.uri);
  //     setAlbumUri(status.track.album.uri);
  //   }

  //   ws.current.onerror = (e) => {
  //     console.error("Error in websocket: " + e);
  //   }

  //   ws.current.onclose = (e) => {
  //     console.log("Disconnected: " + e.code + " " + e.reason + " " + e.wasClean);
  //   }

  //   return () => {
  //     ws.current?.close();
  //   }
  // }, []);
  
  // async function myProfile() {
  //   Linking.openURL('spotify:user:schreineravery-us').catch(err => console.error('An error occurred', err));;
  // }

  // async function goToTrack() {
  //   Linking.openURL(trackUri!).catch(err => console.error('An error occurred', err));
  // }

  // async function goToAlbum() {
  //   Linking.openURL(alubmUri!).catch(err => console.error('An error occurred', err));
  // }

  // async function playSunflower() {
  //   try {
  //     await playTrack("spotify:track:3KkXRkHbMCARz0aVfEt68P")
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function playDancingQueen() {
  //   try {
  //     await playTrack("spotify:track:0GjEhVFGZW8afUYGChu3Rr")
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function connectRemote() {
  //   try {
  //     await remote.connect('/Axi0p4mjud06AjLBLMXaQy7050ObseTxISWTWMXp7b28eWCpfiBOmxyYGyVCITu5HcYCsAvuOBHXfkrTI+fdmqem8GpaPQ9+dPySDtAiwgxjsdUDrmB61OwfknjCth2hWbZcNN4kqkjvjGVUJvxJTw6TTjjJ4RrIG558gfRCTYJz8fl/l5eYu7NElJUU0ulTBolIX2G4nuBIXwTtx8tefFDmCtetCT7Thv9/yVcHPQ1893TJ9ie0p0HSaT7Pw6Zt/dkDMlt+fGqE1+VIFoLF/eYkVpT8oCRXnpzkXHU+D0I2C6cC45yRJn6eL3Ld+Mv');
  //     remote.playUri('spotify:track:6CfrYuD3YRDYdYvH9jNtXY');
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }
  
  // async function refreshSession() {
  //   try {
  //     console.log('Refreshing session.');
  //     var result = await Keychain.getGenericPassword({ service: 'spotifySession' });
  //     if (result) {
  //       const spotifySession: SpotifySession = JSON.parse(result.password);
  //       await refreshSpotifySession(spotifySession);
  //     }
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  // async function forgetSession() {
  //   try {
  //     console.log('Forgetting session.');
  //     await removeSpotifySession();
  //   }
  //   catch (e) {
  //     console.error(e);
  //   }
  // }

  const mockCard: Card = {
    userId: 'schreineravery-us',
    nickname: 'Avery',
    pictureUrl: 'https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f'
  }

  const mockTrack: TrackType = {
    uri: 'spotify:track:3UDmHZcBTQp8Iu8droNtU1',
    name: 'Revolution - Remastered 2009',
    artists: [
      {
        uri: 'spotify:artist:3WrFJ7ztbogyGnTHbHJFl2',
        name: 'The Beatles',
      }
    ],
    album: {
      uri: 'spotify:album:1cTeNkeINtXiaMLlashAKs',
      coverUrl: 'https://i.scdn.co/image/ab67616d0000b2736e3d3c964df32136fb1cd594'
    }
  }
  
  return (
    <AnthemView>
      <TrackPost track={mockTrack} card={mockCard} />
      <TrackPost track={mockTrack} card={mockCard} />
      <TrackPost track={mockTrack} card={mockCard} />
    </AnthemView>
  );
};

const styles = StyleSheet.create({
});
