import { MongoClient, ObjectId } from "mongodb";
import Head from 'next/head'
import { Fragment } from "react";
import MeetupDetails from "../../components/meetups/MeetupDetails";

function DetailsPage({ meetupData }) {
  return (
    <Fragment>
    <Head>
      <title>{meetupData.title}</title>
      <meta name='description' content="View meetup details!" />
    </Head>
    <MeetupDetails
      title={meetupData.title}
      image={meetupData.image}
      description={meetupData.description}
      address={meetupData.address}
    />
    </Fragment>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI
  );

  const db = client.db();

  const clientCollection = db.collection("meetups");

  const meetups = await clientCollection.find({}, { id: 1 }).toArray();

  client.close();

  return {
    fallback: true,
    paths: meetups.map((item) => ({
      params: {
        meetupId: item._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    process.env.NEXT_PUBLIC_MONGODB_URI
  );

  const db = client.db();

  const clientCollection = db.collection("meetups");

  const selectedMeetup = await clientCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        is: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default DetailsPage;
