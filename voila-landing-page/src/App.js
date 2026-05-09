import React from "react";
// Perhatikan jalur import-nya menunjuk langsung ke AppRoutes
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
