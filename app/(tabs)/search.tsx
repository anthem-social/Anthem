import { StyleSheet } from "react-native";
import { AnthemView } from "@/components/Core";
import { Button, Text, View } from "@/components/Themed";
import { getUser } from "@/api/users";
import { searchAlbums, searchArtists, searchTracks } from "@/api/search";
import { Search as Searchy } from "@/components/Core";

export default function Search() {

  const handleGetMe = async () => {
    var response = await getUser("schreineravery-us");
    console.log("response: " + JSON.stringify(response));
  }

  const handleGetJake = async () => {
    var response = await getUser("jake");
    console.log("response: " + JSON.stringify(response));
  }

  const handleSearchTracks = async () => {
    var response = await searchTracks("revolution");
    console.log("response: " + JSON.stringify(response));
  }

  const handleSearchArtists = async () => {
    var response = await searchArtists("boat");
    console.log("response: " + JSON.stringify(response));
  }

  const handleSearchAlbums= async () => {
    var response = await searchAlbums("birds");
    console.log("response: " + JSON.stringify(response));
  }
  
  return (
    <View>
      <Searchy
        placeholder="Search for tracks, artists, or albums"
        searchHandler={getUser}
      />
    </View>
    // <AnthemView>
    //     <Text>This will be the search page.</Text>
    //     <Button title="Get Me" onPress={handleGetMe} />
    //     <Button title="Get Jake" onPress={handleGetJake} />
    //     <Button title="Search Albums" onPress={handleSearchAlbums} />
    //     <Button title="Search Artists" onPress={handleSearchArtists} />
    //     <Button title="Search Tracks" onPress={handleSearchTracks} />
    // </AnthemView>
  );
};

const styles = StyleSheet.create({
});
