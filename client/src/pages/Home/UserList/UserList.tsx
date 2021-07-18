import React from "react";
import {
  Paper,
  Box,
  TextField,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getLoading, getSearchText, getUsers } from "./userListSlice";
import useAppSelector from "hooks/useAppSelector";
import Progress from "components/Progress/Progress";
import { getUserName } from "utils/userUtils";
import Avatar from "components/Avatar/Avatar";
import Navigate from "components/Navigate/Navigate";

export default function UserList(): JSX.Element {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getLoading);

  const searchText = useAppSelector(getSearchText);

  const users = useAppSelector(getUsers);

  React.useEffect(() => {
    dispatch(actions.searchUsers());
  }, []);

  return (
    <Paper elevation={4}>
      <Box padding={2}>
        <TextField
          id="searchText"
          variant="outlined"
          placeholder="Search user..."
          value={searchText}
          onChange={(e) => dispatch(actions.changeSearchText(e.target.value))}
          InputProps={{
            endAdornment: <>{loading && <Progress size={20} />}</>,
          }}
          fullWidth
        />

        {!users.length && !loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <Typography color="textSecondary" align="center">
              No matching users...
            </Typography>
          </Box>
        )}

        {!!users.length && (
          <List>
            {users.map((x) => (
              <Navigate key={x.id} to={`/${x.id}`}>
                <ListItem button>
                  <ListItemIcon>
                    <Avatar src={x.avatarUrl} />
                  </ListItemIcon>

                  <ListItemText primary={getUserName(x)} />
                </ListItem>
              </Navigate>
            ))}
          </List>
        )}
      </Box>
    </Paper>
  );
}
