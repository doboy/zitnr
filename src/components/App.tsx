import React, { useCallback } from "react";
import { Menu } from "./Menu";

export const App = () => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(
    window.location.hash,
  );

  window.addEventListener("hashchange", () => setSelectedMenuItem(window.location.hash));

  const handlePageChange = useCallback((page: "#zitnr" | "#calendar" | "#donate" | "#fundraiser") => {
    setSelectedMenuItem(page);
    window.history.pushState({}, "", page);
  }, [selectedMenuItem]);

  return (
    <Menu
      selectedMenuItem={selectedMenuItem}
      handlePageChange={handlePageChange}
    />
  );
};
