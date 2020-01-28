import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/core/SvgIcon/SvgIcon";
import TextField from "@material-ui/core/TextField";
import { red } from "@material-ui/core/colors";
import Divider from "@material-ui/core/Divider";

function getModalStyle() {
  const top = 33;
  const left = 40;

  return {
    top: `${top}%`,
    left: `${left}%`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "20%",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  },
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function ViewImageModal(props) {
  const classes = useStyles();
  const { selectedImage, openImageView, handleClose } = props;
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [fullname, setFullname] = React.useState("");

  console.log("selectedImage...", selectedImage);

  function fullnameChangeHandler(e) {
    setFullname(e.target.value);
    props.updateClickHandler(e.target.value);
  }

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={openImageView}
        onBackdropClick={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Edit</h2>

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
                        <span size="small" color="primary">
                          #{tag}{" "}
                        </span>
                      );
                    })}
                  </Typography>

                  <span>
                    <IconButton aria-label="add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    {selectedImage.likes.count} likes
                  </span>
                  <div style={{ margin: "1rem" }}>
                    <form
                      className={classes.root}
                      noValidate
                      autoComplete="off"
                    >
                      <TextField id="standard-basic" label="Add a comment" />
                      <Button variant="contained" color="primary">
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
