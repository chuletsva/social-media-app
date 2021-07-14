import type PostCommentDto from "model/dto/PostCommentDto";
import { IconButton, Typography, Box, Link } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import moment from "moment";

import Avatar from "components/Avatar/Avatar";

import { getUserName } from "utils/userUtils";
import useAppDispatch from "hooks/useAppDispatch";
import { actions, getPostCommentById } from "../postListSlice";
import useAppSelector from "hooks/useAppSelector";
import { getUser } from "pages/Login/loginSlice";

interface PostCommentProps {
  postId: string;
  commentId: string;
}

export default function PostComment({
  postId,
  commentId,
}: PostCommentProps): JSX.Element {
  const dispatch = useAppDispatch();

  const comment: PostCommentDto = useAppSelector((state) =>
    getPostCommentById(state, postId, commentId),
  );

  const isUserComment = useAppSelector(
    (state) =>
      getPostCommentById(state, postId, commentId).authorId ===
      getUser(state).id,
  );

  return (
    <Box display="flex">
      <Avatar src={comment.avatarUrl} />

      <Box display="flex" flexDirection="column" ml={2}>
        <Link>
          {getUserName({
            firstName: comment.authorFirstName,
            lastName: comment.authorLastName,
          })}
        </Link>

        <Typography variant="body2">{comment.text}</Typography>

        <Box display="flex" alignItems="center">
          <Typography variant="caption">
            {moment(comment.createDate).fromNow()}
          </Typography>

          {isUserComment && (
            <IconButton size="small">
              <DeleteIcon
                color="secondary"
                onClick={() =>
                  dispatch(actions.deletePostComment({ postId, commentId }))
                }
              />
            </IconButton>
          )}
        </Box>
      </Box>
    </Box>
  );
}
