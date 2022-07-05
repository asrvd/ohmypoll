export function addNewVote(voteID: string) {
  const allVotes = localStorage.getItem("votes");
  if (allVotes) {
    const votes = JSON.parse(allVotes);
    votes.push(voteID);
    console.log(votes);
    localStorage.setItem("votes", JSON.stringify(votes));
  } else {
    localStorage.setItem("votes", JSON.stringify([voteID]));
  }
}
