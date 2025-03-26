import React from "react";
import { usePlayerIdQuery } from "../api/puppyBowlApi";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function SinglePlayer() {
  const playerId = useParams();

  const { data = {}, error, isLoading } = usePlayerIdQuery(playerId.id);

  // Show a loading message while data is being fetched
  if (isLoading) {
    return (
      <section>
        <h2>Fetching Player...</h2>
      </section>
    );
  }

  // Show an error message if the fetch failed
  if (error) {
    return (
      <section>
        <h2>Guess they ran away. Come back later</h2>
      </section>
    );
  }

  console.log(data);
  return (
    <section className="single-player-card">
      <div className="player-details">
        <h2>{data.data.player.name}</h2>
        <img
          className="player-image"
          src={`${data.data.player.imageUrl}`}
          alt=""
        />
        <p>
          <strong>Breed:</strong> {data.data.player.breed}
        </p>
        <p>
          <strong>Team Name:</strong> {data.data.player.team.name}
        </p>
      </div>
      <Link to="/">Back</Link>
    </section>
  );
}

export default SinglePlayer;
