const trakt = "https://api.trakt.tv"; //base URL for any Trakt API requests

/*
 * Functions for Trakt API requests.
 */

//Function to retrieve most anticipated shows
async function getMostAnticipatedShows() {
  const reqUrl = `${trakt}/shows/anticipated`;
  const response = await fetch(reqUrl, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

//Function to retrieve show details
async function getShowDetails(showId) {
  const reqUrl = `${trakt}/shows/${showId}?extended=full`;
  const response = await fetch(reqUrl, {
    headers: {
      "Content-Type": "application/json",
      "trakt-api-version": 2,
      "trakt-api-key": process.env.TRAKT_CLIENT_ID,
    },
  });
  return await response.json();
}

export default {
  getMostAnticipatedShows, 
  getShowDetails,
};