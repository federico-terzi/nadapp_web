import { Button, Card, CardActionArea, CardActions, CardContent, TableCell, TableRow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    textAlign: "center"
  },
  title: {
    fontWeight: "bold",
    marginBottom: 20,
  }
})

interface Props {
  image: string,
  title: string,
  buttonText: string,
  buttonLink: string,
}

function HomeCard({ image, title, buttonText, buttonLink }: Props): React.ReactElement<Props> {
  const classes = useStyles()
  const history = useHistory()

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={() => {
        history.push(buttonLink)
      }}>
        <CardContent>
          <Typography className={classes.title} variant="h5" component="h1">
            {title}
          </Typography>
          <img src={image} height={150} />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
export default HomeCard