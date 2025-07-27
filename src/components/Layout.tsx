import React from "react";
import { Menu } from "./Menu";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="off-white-bg">
      <div className="ui container">
        <Menu selectedMenuItem="home" />
      </div>
    </div>
  )
};