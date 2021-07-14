import React from "react";
import { Grid } from "@material-ui/core";
import useAppSelector from "hooks/useAppSelector";
import { getFollowingIds } from "../followingsSectionSlice";
import Following from "../Following/Following";

export default function FollowingList(): JSX.Element {
  const followingIds: string[] = useAppSelector(getFollowingIds);

  return (
    <Grid container direction="column" spacing={5}>
      {followingIds.map((id) => (
        <Grid key={id} item xs>
          <Following followingId={id} />
        </Grid>
      ))}
    </Grid>
  );
}
