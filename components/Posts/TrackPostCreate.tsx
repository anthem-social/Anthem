import { useEffect, useState } from "react";
import { searchTracks } from "@/api/spotify";
import { Track } from "@/types";
import { TrackResult } from "../Search/TrackResult";
import { SelectFromSearch } from "../SelectFromSearch";

type Props = {
  clearCount: number;
  contentSetter: (content: object) => void;
}

export default function TrackPostCreate({ clearCount, contentSetter }: Props) {
  const [selected, setSelected] = useState(false);
  const [track, setTrack] = useState<Track>();

  const handleSelection = (track: Track) => {
    setTrack(track);
    setSelected(true);
    contentSetter(track);
  }

  useEffect(() => {
    console.log("Clearing track post create...");
    setSelected(false);
    setTrack(undefined);
  }, [clearCount]);

  return (
    <>
    {selected ? (
      <TrackResult {...track as Track} />
    ) : (
      <SelectFromSearch
        buttonText="+ Add a Song"
        placeholderText="Search for a song..."
        resultType="TrackResult"
        searchHandler={searchTracks}
        selectionHandler={(track: Track) => handleSelection(track)}
      />
    )}
    </>
  )
}
