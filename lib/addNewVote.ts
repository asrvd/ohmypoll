export function addNewVote(voteID: string) {
    const allVotes = localStorage.getItem('votes');
    if (allVotes) {
        const votes = JSON.parse(allVotes);
        votes.push(voteID);
        localStorage.setItem('votes', JSON.stringify(votes));
    }
    localStorage.setItem('votes', JSON.stringify([voteID]));
}