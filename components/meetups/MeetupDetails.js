import styles from './MeetupDetails.module.css'

function MeetupDetails(props) {
    return <section className={styles.container}>
        <img src={props.image} alt='pic' />
        <h2>{props.title}</h2>
        <address>{props.address}</address>
        <p>{props.description}</p>
    </section>
}

export default MeetupDetails;