import React from "react";
import { Menu } from "./Menu";
import { MenuItem } from "../types";

const Layout = ({ children, title, selectedMenuItem }: { children: React.ReactNode, title: string, selectedMenuItem: MenuItem }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/semantic-ui@2.5.0/dist/semantic.min.css"
      />
      <div className="off-white-bg">
      <div className="ui container">
        <Menu selectedMenuItem={selectedMenuItem} />
        {children}
      </div>
    </div>
  </div>
  )
};

export default Layout;