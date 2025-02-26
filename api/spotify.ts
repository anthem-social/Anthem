import { Album, Artist, Track } from "@/types";
import { getAnthemClient } from "./clients";
import { ServiceResult } from './ServiceResult';

export async function saveAlbum(uri: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    client.put(`/spotify/save/album/${encodeURIComponent(uri.split(":")[2])}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to save album.", "spotify.saveAlbum()", error);
  }
}

export async function saveTrack(uri: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    client.put(`/spotify/save/track/${encodeURIComponent(uri.split(":")[2])}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to save track.", "spotify.saveTrack()", error);
  }
}

export async function searchAlbums(query: string): Promise<Array<Album>> {
  const result = await getAnthemClient();

  if (result.IsSuccess && result.Data) {
      const client = result.Data;
      const response = await client.get(`/spotify/search/albums?query=${encodeURIComponent(query)}`);
      const results = response.data as Array<Album>;
      return results;
  }
  else {
      throw new Error(result.ErrorMessage);
  }
}

export async function searchArtists(query: string): Promise<Array<Artist>> {
  const result = await getAnthemClient();

  if (result.IsSuccess && result.Data) {
      const client = result.Data;
      const response = await client.get(`/spotify/search/artists?query=${encodeURIComponent(query)}`);
      const results = response.data as Array<Artist>;
      return results;
  }
  else {
      throw new Error(result.ErrorMessage);
  }
}

export async function searchTracks(query: string): Promise<Array<Track>> {
  const result = await getAnthemClient();

  if (result.IsSuccess && result.Data) {
      const client = result.Data;
      const response = await client.get(`/spotify/search/tracks?query=${encodeURIComponent(query)}`);
      const results = response.data as Array<Track>;
      return results;
  }
  else {
      throw new Error(result.ErrorMessage);
  }
}

export async function unsaveAlbum(uri: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    client.delete(`/spotify/save/album/${encodeURIComponent(uri.split(":")[2])}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to unsave album.", "spotify.unsaveAlbum()", error);
  }
}

export async function unsaveTrack(uri: string): Promise<ServiceResult<null>> {
  try {
    const getClient = await getAnthemClient();

    if (getClient.IsFailure)
      return ServiceResult.Failure(getClient.ErrorMessage!, getClient.ErrorOrigin!);

    const client = getClient.Data!;

    client.delete(`/spotify/save/track/${encodeURIComponent(uri.split(":")[2])}`);

    return ServiceResult.Success(null);
  }
  catch (error) {
    return ServiceResult.Failure("Failed to unsave track.", "spotify.saveTrack()", error);
  }
}
