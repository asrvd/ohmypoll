export function checkForUpVote(pollID: string) {
  const allUpVotes = localStorage.getItem("upvotes");
  if (allUpVotes) {
    const upvotes = JSON.parse(allUpVotes);
    if (upvotes.includes(pollID)) {
      return true;
    }
    return false;
  }
  return false;
}
