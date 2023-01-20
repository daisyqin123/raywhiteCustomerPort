/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react";
import Header from "./header";
import LeftNavigationModal from "./leftNavigationModal";


const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div>
        <LeftNavigationModal />
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
