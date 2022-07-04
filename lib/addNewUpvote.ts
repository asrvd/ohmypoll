export function addNewUpVote(pollID: string) {
  const allUpVotes = localStorage.getItem("upvotes");
  if (allUpVotes) {
    const upvotes = JSON.parse(allUpVotes);
    upvotes.push(pollID);
    localStorage.setItem("upvotes", JSON.stringify(upvotes));
  } else {
    localStorage.setItem("upvotes", JSON.stringify([pollID]));
  }
}
