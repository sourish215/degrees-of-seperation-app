let peopleList = {};
let isSeen = {};
let simpleRelations = [];

function initPeopleList(person)
{
  if (!peopleList[person]) {
    peopleList[person] = [];
  }
}

// add friend function
function addFriend(a, b)
{
  if (!peopleList[a]) {
    initPeopleList(a);
  }
  if (!peopleList[b]) {
    initPeopleList(b);
  }
	// add b to a's friend list
	peopleList[a].push(b);
}

// find all relations between u and v
function isFriend(u, v)
{
	for(const person in peopleList) {
    isSeen[person] = false
  }
		let relation = [];

		// add u to relation array
		relation.push(u);

		// call recursive function
		isFriendUtil(u, v, isSeen, relation);
}

function isFriendUtil(u,v,isSeen,currentRelation)
{
	if (u === v) {
		// one relation is found
		simpleRelations.push([...currentRelation])
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

addFriend('Sameer', 'Ayushi')
addFriend('Ayushi', 'Bhaskar')
addFriend('Sameer', 'Kamal')
addFriend('Kamal', 'Shanti')
addFriend('Shanti', 'Bhaskar')

console.log('peoplelist', peopleList)

isFriend('Sameer', 'Bhaskar');

console.log('simple', simpleRelations)