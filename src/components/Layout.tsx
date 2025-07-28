import React from "react";
import { Menu } from "./Menu";
import { MenuItem } from "../types";
import Head from "next/head";

const Layout = ({ children, title, description, selectedMenuItem }: { children: React.ReactNode, title: string, description?: string, selectedMenuItem: MenuItem }) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title || description} />
      </Head>

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