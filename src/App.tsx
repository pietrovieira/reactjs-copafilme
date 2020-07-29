import React from "react";
import ListMovies from './components/ListMovies'
const App: React.FC = () => {
  return (
    <main>
      <div className="center">
        <ListMovies />
      </div>
    </main>
  );
};
export default App;