import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  }
}));

export default function ImageGrid(props) {
  const classes = useStyles();
  const [openImageView, setOpenImageView] = useState(false);


    const viewImage = person => {
console.log("open image",person);
        setOpenImageView(true);
        console.log("openImageView",openImageView);
    };

    return (
      <Grid container spacing={1}  direction="row"
            alignItems="center">
      {props.data&&props.data.map((person) => (
          <Grid  justify="center" id="image-grids" item xs={4} key={person.id}  onClick={ () => viewImage(person)} >
      <Card className={classes.card} variant="outlined" >
        <CardMedia
            className={classes.media}
            image={person.images.standard_resolution.url}
            title="Image not loaded"
        />
      </Card>

          </Grid>))}
      </Grid>
  );
}
