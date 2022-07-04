import { Fragment } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import NewMeetupsForm from "../../components/meetups/NewMeetupForm";

function AddMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.replace("/");
  }

  return (
    <Fragment>
      <Head>
        <title>Add a New Meetup</title>
        <meta
          name="description"
          content="Add your own meetups!"
        />
      </Head>
      <NewMeetupsForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}

export default AddMeetupPage;
