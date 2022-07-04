import { Fragment } from "react";
import Head from 'next/head'
import Welcome from "../components/meetups/Welcome";

function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Welcome</title>
        <meta name="description" content="Create amazing networking opportunities with React Meetups!" />
      </Head>
      <Welcome />
    </Fragment>
  );
}

export default HomePage;
