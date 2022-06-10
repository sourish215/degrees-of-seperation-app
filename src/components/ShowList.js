import { Paper, Typography, List, ListItem, Divider, ListItemIcon } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ShowList({ relations }) {
  return (
    <Paper sx={{ width: '80%', margin: 'auto' }} elevation={4}>
        {relations.length === 0
          ? <Typography variant='h6'>No relations!</Typography> :
          <List style={{ listStyle : 'none' }}>
            {relations.map((relation, index) => {
              return <>
              <ListItem style={{ textAlign: 'left' }}>
                <ListItemIcon><ArrowRightIcon /></ListItemIcon>{relation.join(' > ')}
              </ListItem>
              <Divider variant='middle' /></>
            })}
          </List>}
    </Paper>
  )
}

export default ShowList