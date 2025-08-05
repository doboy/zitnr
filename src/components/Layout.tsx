import React from "react";
import { Menu } from "./Menu";
import { MenuItem } from "../types";
import Head from "next/head";

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  selectedMenuItem: MenuItem;
  canonicalUrl?: string;
};

const Layout = ({ children, title, description, selectedMenuItem, canonicalUrl }: LayoutProps) => {
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title || description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
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