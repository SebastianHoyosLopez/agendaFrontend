import React from "react";
import styles from "./detailsReservations.module.css";

const DetailsReservation = () => {
  return (
    <div>
      <h1>Página dinámica</h1>
      {/* <p>ID: {id}</p> */}
      <div className={styles.container2}>
        <h2>Popular event</h2>
        <hr />
        <div className={styles.event_details}>
          {/* <img src='https://i.ibb.co/yS2sbyC/Rectangle-37.png' className='iconDetails'> */}
          <div>
            <h4>Facebook</h4>
            <div>fine location, GPS, coarse location</div>
            <div>0 mins ago</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsReservation;
