import React from "react";

// Import the Players component, which we'll use to show a list of players
import Players from "./components/Players";
import { Route, Routes } from "react-router-dom";
import SinglePlayer from "./components/SinglePlayer";
// Define the App component
function App() {
  // This component renders the Players component inside a div
  // This div has a class of 'App', which we could use for styling
  return (
    <section>
      {/* <h1>Puppy Players</h1> */}
      <Routes>
        <Route path="/:id" element={<SinglePlayer />}></Route>
        <Route path="/" element={<Players />}></Route>
      </Routes>
      {/* <div className="App">
        <Players />
      </div> */}
    </section>
  );
}

// Export the App component as the default export
export default App;
