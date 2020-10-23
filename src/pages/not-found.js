import { Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";

function NotFoundPage() {
  return <Layout minimalNavbar title="Page Not Found" marginTop={120}>
    <Typography variant="h5" align="center" paragraph>
      Sorry, this page isn't available.
    </Typography>
    <Typography align="center">
      The link you followed may be broken, or the page may have been removed.
    </Typography>
    {" "}
    <Link to="/">
      <Typography color="primary" component='span'>
        Go back to Instagram.
      </Typography>
    </Link>
  </Layout>
}

export default NotFoundPage;
