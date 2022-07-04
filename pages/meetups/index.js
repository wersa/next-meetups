import { Fragment } from "react";
import MeetupList from "../../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from 'next/head'


function AllMeetupsPage(props) {
  return (
    <Fragment>
      <Head>
        <title>All meetups</title>
        <meta name="description" content="Explore world with others! Search for meetups all over the world" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// after deployment

// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;
//  // fetch data, ...
//     return {
//         props: {
//             meetups: DUMMY_DATA
//         }
//     }
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.NEXT_PUBLIC_MONGODB_URI);

  const db = client.db();
  console.log("db", db);

  const clientCollection = db.collection("meetups");

  const meetups = await clientCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((item) => ({
        id: item._id.toString(),
        image: item.image,
        title: item.title,
        address: item.address,
      })),
    },
    revalidate: 1,
  };
}

export default AllMeetupsPage;
