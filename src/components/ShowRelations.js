import { Typography, List, ListItem, Divider, ListItemIcon } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ShowRelations({ peopleList }) {
  let people = [];
  for(let person in peopleList) {
    people.push(person);
  }
  return (
    <div style={{ width: "80%", margin: "0px auto" }}>
      <Typography variant='h6'>Relations:</Typography>
      <List>
        {people.map((person, index) => {
          return (
            peopleList[person].map((friend, index) => {
              return <>
              <ListItem>
                <ListItemIcon><ArrowRightIcon /></ListItemIcon>
                {person} is friend of {friend}
              </ListItem>
              <Divider /></>
            })
          )
        })}
      </List>
    </div>
  )
}

export default ShowRelations