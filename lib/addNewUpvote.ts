export function addNewUpVote(pollID: string) {
  const allUpVotes = localStorage.getItem("upvotes");
  if (allUpVotes) {
    const votes = JSON.parse(allUpVotes);
    votes.push(pollID);
    localStorage.setItem("upvotes", JSON.stringify(votes));
    
  }
  localStorage.setItem("upvotes", JSON.stringify([pollID]));
  console.log("upvote added");
}
