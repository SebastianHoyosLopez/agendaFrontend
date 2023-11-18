import { useRouter } from "next/router";

function DynamicPage() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Página dinámica</h1>
      <p>ID: {id}</p>
      <div className='container2'>
        <h2 className="h2-txt">Popular event</h2>
        <hr />
        <div className='event-details'>
          {/* <img src='https://i.ibb.co/yS2sbyC/Rectangle-37.png' className='iconDetails'> */}
          <div>
            <h4>Facebook</h4>
            <div>fine location, GPS, coarse location</div>
            <div>0 mins ago</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container2 {
          border: 2px solid black;
          border-radius: 10px;
          padding: 20px;
          text-align: center;
        }

        .event-details {
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        h4 {
          margin: 0; // Elimina el margen predeterminado del h4
        }
      `}</style>
    </div>
  );
}

export default DynamicPage;
