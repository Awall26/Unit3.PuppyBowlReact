import React, { useState } from "react";
import { useCreatePlayerMutation } from "../api/puppyBowlApi";

const NewPlayer = () => {
  const [createPlayer] = useCreatePlayerMutation();
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    imageUrl: "",
    status: "bench",
    teamId: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPlayer(formData);

      setFormData({
        name: "",
        breed: "",
        imageUrl: "",
        status: "bench",
        teamId: 1,
      });
    } catch (err) {
      console.error("Failed to create player:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-player-form">
      <h2>Add New Player</h2>
      <input
        type="text"
        placeholder="Player Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Breed"
        value={formData.breed}
        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={formData.imageUrl}
        onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
      />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default NewPlayer;
