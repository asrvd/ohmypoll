export function checkForVote(voteID: string) {
  const allVotes = localStorage.getItem("votes");
  if (allVotes) {
    const votes = JSON.parse(allVotes);
    if (votes.includes(voteID)) {
      return true;
    }
    return false;
  }
  return false;
}
