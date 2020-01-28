import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {red} from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Grid from "@material-ui/core/Grid";
import "./ImageCard.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  card: {
      maxWidth: "100%"
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

function changeToDate(created_time) {
  var date = new Date(parseInt(created_time));
  return date.toDateString();
}

export default function ImageCard(props) {
  const classes = useStyles();
    const [comment, setComment] = React.useState("");
    let {data} = props;
    useEffect(() => {
        data &&
        data.map(image => {
            image["comments"] = [];
            return image;
        });
    }, [data]);

    function commentChangeHandler(e) {
        setComment(e.target.value);
    }

    const updateComment = index => {
        data[index].comments = data[index].comments.concat([comment]);
        setComment("");
    };

    console.log("data...", data);
  return (
      <Grid
          container
          spacing={2}
          direction="row"
          justify="flex-start"
          alignItems="center"
      >
          {props.data &&
          props.data.map((person, index) => (
          <Grid item xs={6} key={person.id}>
              <Card className={classes.card} variant="outlined">
                  <CardHeader
                      avatar={
                          <Avatar
                              alt={person.user.full_name}
                              src={person.user.profile_picture}
                          />
                      }
                      title={person.user.username}
                      subheader={changeToDate(person.caption.created_time)}
                  />
                  <CardMedia
                      className={classes.media}
                      image={person.images.standard_resolution.url}
                      title="Paella dish"
                  />
                  <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {person.caption.text.split("#")[0]}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                          {person.tags.map(tag => {
                              return (
                                  <Button key={tag} size="small" color="primary">
                                      #{tag}
                                  </Button>
                              );
                          })}
                      </Typography>
                      <Typography
                          variant="body2"
                          color="textSecondary"
                          component="ul"
                      >
                          {person.comments &&
                          person.comments.length > 0 &&
                          person.comments.map(tag => {
                              return (
                        <li size="small" key={tag} color="primary">
                            {tag}
                        </li>
                              );
                          })}
                      </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                          <FavoriteIcon/>
                      </IconButton>
                      <span>{person.likes.count} likes</span>
                  </CardActions>
                  <div style={{margin: "1rem"}}>
                      <form className={classes.root} noValidate autoComplete="off">
                          <TextField
                              id={"add-comment" + index}
                              label="Add a comment"
                              onChange={commentChangeHandler}
                          />
                          <Button
                              variant="contained"
                              id="add-comments-button"
                              color="primary"
                              onClick={() => updateComment(index)}
                          >
                              Add
                          </Button>
                      </form>
                  </div>
              </Card>
          </Grid>
          ))}
      </Grid>
  );
}
