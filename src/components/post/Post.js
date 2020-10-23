import React from "react";
import { CommentIcon, LikeIcon, MoreIcon, RemoveIcon, SaveIcon, ShareIcon, UnlikeIcon } from "../../icons";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { Link } from "react-router-dom";
import { Button, Divider, Hidden, TextField, Typography } from "@material-ui/core";
import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";
import PostSkeleton from "./PostSkeleton";

function Post() {
  const classes = usePostStyles();
  const [showOptionsDialog, setOptionsDialog ] = React.useState(false)
  const [loading, setLoading] = React.useState(true)
  const { id, media, likes, user, caption, comments } = defaultPost;

  setTimeout(() => setLoading(false), 2000)
  if(loading) return <PostSkeleton />

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}
      >
        {/* Post Header */}
        <div className={classes.postHeader}>
          <UserCard user={user} avatarSize={32} />
          <MoreIcon className={classes.moreIcon} onClick={() => {
            setOptionsDialog(true)
          }} />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="Post media" className={classes.image} />
        </div>
        {/* Post Button */}
        <div className={classes.postButtonWrapper}>
          <div className={classes.postButton}>
            <LinkButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes === 1 ? "1 like" : `${likes} likes`}</span>
          </Typography>
          <div className={classes.postCaptionContainer}>
            <Link to={`${user.username}`}>
              <Typography
                variant="body2"
                component="span"
                className={classes.postCaption}
                dangerouslySetInnerHTML={{__html: caption}}
              />
            </Link>
          </div>
          {comments.map((comment) => (
            <div key={comment.id}>
              <Link to={`/${comment.user.username}`}>
                <Typography
                  variant="subtitle2"
                  component="span"
                  className={classes.commentUsername}
                >
                  {comment.user.username}
                </Typography>{" "}
                <Typography variant="body2" component="span">
                  {comment.content}
                </Typography>
              </Link>
            </div>
          ))}
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <div className={classes.comment}>
            <Divider />
            <Comment />
          </div>
        </Hidden>
      </article>
      {showOptionsDialog && <OptionsDialog onClose={() => {
        setOptionsDialog(false)
      }} />}
    </div>
  );
}

function LinkButton() {
  const classes = usePostStyles()
  const [liked, setLiked] = React.useState(false)
  const Icon = liked ? UnlikeIcon : LikeIcon
  const className = liked ? classes.liked: classes.like;
  const onClick = liked ? handleUnlike: handelLike;

  function handelLike(){
    console.log('like')
    setLiked(true)
  }

  function handleUnlike(){
    console.log('unlike')
    setLiked(false)
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
  const classes = usePostStyles()
  const [saved, setSaved] = React.useState(false)
  const Icon = saved ? RemoveIcon : SaveIcon
  const onClick = saved ? handleUnSave: handleSave;

  function handleSave(){
    console.log('save')
    setSaved(true)
  }

  function handleUnSave(){
    console.log('remove')
    setSaved(false)
  }

  return <Icon className={classes.SaveIcon} onClick={onClick} />;
}

function Comment() {
  const classes = usePostStyles()
  const [content, setContent] = React.useState('')

  return(
    <div className={classes.commentContainer}>
      <TextField
        className={classes.textField}
        fullWidth
        value={content}
        placeholder="Add a comment..."
        multiline
        rowsMax={2}
        rows={1}
        onChange={event => setContent(event.target.value)}
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline
          }
        }}
      />
      <Button
        color="primary"
        className={classes.commentButton}
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>

  )
}

export default Post;
