import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

function getModalStyle() {
  const top = 33;
  const left = 33;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "33%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function ViewImageModal(props) {
  const classes = useStyles();
  const { selectedImage, openImageView, handleClose } = props;
  const [modalStyle] = React.useState(getModalStyle);
  const [comment, setComment] = React.useState("");
  const [like, setLike] = React.useState(false);
  const [comments, setComments] = React.useState([]);

  function commentChangeHandler(e) {
    setComment(e.target.value);
  }
  function closeModal() {
    handleClose();
    setComments([]);
    setLike(false);
  }

  /*add comment for the selected image*/
  function updateComments() {
    let updatedComments = [comment];
    setComments(comments.concat(updatedComments));
    setComment("");
  }

  function onLikeImage() {
    setLike(!like);
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openImageView}
        onBackdropClick={closeModal}
      >
        <div style={modalStyle} className={classes.paper}>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              {selectedImage ? (
                <img
                  src={selectedImage.images.standard_resolution.url}
                  alt={selectedImage.images.standard_resolution.url}
                  style={{
                    height: "100%",
                    maxWidth: "100%",
                    width: selectedImage.images.standard_resolution.width
                  }}
                ></img>
              ) : null}
            </Grid>
            <Grid item xs={6}>
              {selectedImage ? (
                <div>
                  <Grid
                    container
                    spacing={1}
                    direction="row"
                    justify="center"
                    alignItems="center"
                  >
                    <Grid item xs={4}>
                      <Avatar
                        alt={selectedImage.user.full_name}
                        src={selectedImage.user.profile_picture}
                      />
                    </Grid>{" "}
                    <Grid item xs={8}>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {selectedImage.user.username}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider variant="left" />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {selectedImage.caption.text.split("#")[0]}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {selectedImage.tags.map(tag => {
                      return (
                        <span style={{ color: "#1976d2", fontSize: "14px" }} size="small" key={tag} color="primary">
                          #{tag}{" "}
                        </span>
                      );
                    })}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="ui"
                  >
                    {comments.length > 0 &&
                    comments.map(tag => {
                      return (
                          <li size="small" key={tag} color="primary">
                            {tag}
                          </li>
                      );
                    })}
                  </Typography>
                  <CardActions disableSpacing>
                    <IconButton
                      aria-label="add to favorites"
                      onClick={() => onLikeImage()}
                    >
                      {like ? (
                        <FavoriteIcon style={{ color: red[500] }}/>
                      ) : (
                        <FavoriteBorderIcon/>
                      )}
                    </IconButton>
                    <span>
                      {like
                        ? selectedImage.likes.count + 1
                        : selectedImage.likes.count}{" "}
                      likes
                    </span>
                  </CardActions>
                  <div style={{ margin: "1rem" }}>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField
                        id="standard-basic"
                        onChange={commentChangeHandler}
                        value={comment}
                        label="Add a comment"
                      />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={updateComments}
                        disabled={!comment}
                      >
                        Add
                      </Button>
                    </form>
                  </div>
                </div>
              ) : null}
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  );
}
