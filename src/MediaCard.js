import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './MediaCard.css'
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

function MediaCard({name,img,description}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} style={{padding:'20px'}}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={img}
          title={name}
          style={{padding:'30px'}} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
           {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Button size="small" color="secondary" variant="contained" style={{width:'21%'}}>
          <a href="http://localhost:8080/dashboard/form" target="_blank" className="a"> Get Started</a>
        </Button>
      </CardActions>
    </Card>
  );
}


export default MediaCard;