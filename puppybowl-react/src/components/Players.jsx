import React from "react";
import { usePlayersQuery, useDeletePlayerMutation } from "../api/puppyBowlApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "./SearchBar";
import { Link } from "react-router-dom";
import NewPlayer from "./NewPlayer";

// Define a new React component
const Players = () => {
  const navigate = useNavigate();
  const [searchParameter, setSearchParameter] = useState("");

  const { data = {}, error, isLoading } = usePlayersQuery();
  const [deletePlayer] = useDeletePlayerMutation();

  // Show a loading message while data is being fetched
  if (isLoading) {
    return (
      <section>
        <h2>Gathering the dogs</h2>
      </section>
    );
  }

  // Show an error message if the fetch failed
  if (error) {
    return (
      <section>
        <h2>Who let the dogs out? Gotta catch them, try again later</h2>
      </section>
    );
  }

  const playersToDisplay =
    searchParameter !== "" && data.data.players
      ? data.data.players.filter((player) =>
          player.name.toUpperCase().includes(searchParameter.toUpperCase())
        )
      : data.data.players;

  // Show the fetched data after it has arrived
  console.log(data);
  console.log(playersToDisplay);

  // Add this function
  const handleDelete = async (playerId) => {
    try {
      await deletePlayer(playerId);
    } catch (err) {
      console.error("Failed to delete player:", err);
    }
  };

  return (
    <section>
      <h1>Puppy Players</h1>
      <Searchbar
        searchParameter={searchParameter}
        setSearchParameter={setSearchParameter}
      />
      <NewPlayer />
      <div className="players">
        {/* Map through the data array and generate a div for each player */}

        {playersToDisplay.map((player) => (
          // Use the player's ID as the key for this div
          <div key={player.id} className="player-card">
            {/* Display the player's image, with the player's name as alt text */}
            <img className="player-image" src={player.imageUrl} alt="" />

            <div className="player-details">
              <h2>{player.name}</h2>

              <p>{player.breed}</p>

              <p>{player.status}</p>

              <Link to={`${player.id}`}>Details</Link>

              {/* Add delete button - you might want to add logic to only show for user-created players */}
              <button
                className="delete-button"
                onClick={() => handleDelete(player.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Export the component so it can be imported and used in other files
export default Players;
