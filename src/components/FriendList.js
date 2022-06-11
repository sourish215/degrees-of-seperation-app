import React, { useState } from 'react';
import { TextField, Grid, Button, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FindRelations from './FindRelations';
import ShowRelations from './ShowRelations';

const Alert = React.forwardRef(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FriendList() {
  const [name, setName] = useState("");
  const [friendName, setFriendName] = useState("");
  const [peopleList, setPeopleList] = useState({});
  const [nameOne, setNameOne] = useState("");
  const [nameTwo, setNameTwo] = useState("");
  const [simpleRelations, setSimpleRelations] = useState([]);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [open, setOpen] = useState(false);
  let isSeen = {};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  // function to add friend
  function addFriend(a, b) {
    let list = peopleList;
    if (!list[a]) {
      list[a] = [];
    }
    if (!list[b]) {
      list[b] = [];
    }

    // add b to a's friend list
    if(list[a].indexOf(b) === -1) {
      list[a].push(b);
      setOpen(true);
      setSeverity("success");
      setMessage("Relation added successfully!");
    } else {
      setOpen(true);
      setSeverity("error");
      setMessage("Relation already exists!");
    }
    setPeopleList(list);
  }

  function isFriend(u, v) {
    for(const person in peopleList) {
      isSeen[person] = false
    }
      let relation = [];
      // add u to relation array
      relation.push(u);

      // call recursive function
      isFriendUtil(u, v, isSeen, relation);
  }

  function isFriendUtil(u, v, isSeen, currentRelation) {
    if (u === v) {
      // one relation is found
      let arr = simpleRelations;
      arr.push([...currentRelation]);
      setSimpleRelations(arr);
      return;
    }

      // mark the current name as seen
      isSeen[u] = true;

      // loop for all the friends of the current person
      for (let i in peopleList[u]) {
        if (!isSeen[peopleList[u][i]]) {
          // store current name in relation array
          currentRelation.push(peopleList[u][i]);
          isFriendUtil(peopleList[u][i], v,
          isSeen, currentRelation);

          // remove current name in relation array
          currentRelation.splice(currentRelation.indexOf
          (peopleList[u][i]),1);
        }
      }

      // mark the current person as not seen
      isSeen[u] = false;
  }

  function handleSubmitOne(e) {
    e.preventDefault();
    addFriend(name, friendName);
    setName("");
    setFriendName("");
  }

  function handleSubmitTwo(e) {
    e.preventDefault();
    setSimpleRelations([]);
    isFriend(nameOne, nameTwo);
    setNameOne("");
    setNameTwo("");
  }

  console.log('peoplelist', peopleList);
  console.log('simple', simpleRelations);

  return (
    <Grid container spacing={4} direction='column'>
      <Grid item container xs>
      <Grid item xs>
        <form name='form1' onSubmit={handleSubmitOne}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs className="form-example">
              <TextField size='small' value={name} type="text" label="Name" name="name" id="name" required onChange={e => setName(e.target.value)}/>
            </Grid>
            <Grid item xs className="form-example">
              <TextField size='small' value={friendName} type="text" label="Friend's name" name="friend-name" id="friend-name" required onChange={e => setFriendName(e.target.value)}/>
            </Grid>
            <Grid item xs className="form-example">
                <Button color='primary' type="submit" variant='contained' size='medium'>Add Relation</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Grid item xs>
        <form name='form2' onSubmit={handleSubmitTwo}>
          <Grid container spacing={2} direction='column'>
            <Grid item xs className="form-example">
              <TextField size='small' value={nameOne} type="text" label="Name 1" name="name-one" id="name-one" required onChange={e => setNameOne(e.target.value)}/>
            </Grid>
            <Grid item xs className="form-example">
              <TextField size='small' value={nameTwo} type="text" label="Name 2" name="name-two" id="name-two" required onChange={e => setNameTwo(e.target.value)}/>
            </Grid>
            <Grid item xs className="form-example">
              <Button color='primary' type="submit" variant='contained' size='medium'>Search Relation</Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
      </Grid>

      <Grid item xs>
        <ShowRelations peopleList={peopleList} name={name} friendName={friendName} />
      </Grid>
      
      <Grid item xs>
        <FindRelations relations={simpleRelations}/>
      </Grid>
      
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default FriendList