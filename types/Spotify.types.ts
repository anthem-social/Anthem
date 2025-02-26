export type Album = {
  imageUrl: string;
  name: string;
  uri: string;
}

export type Artist = {
  imageUrl: string | null;
  name: string;
  uri: string;
}

export type Track = {
  album: Album;
  artists: Array<Artist>;
  name: string;
  uri: string;
}
