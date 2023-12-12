export default function Home() {
  return (
    <div className="home-container">
      <img className="img-home" src="./src/assets/Logo.png" alt="logo" />
      <button className="map-button" type="button">
        Accédez à la carte
      </button>
      <div className="slogan-container">
        <img className="img-road" src="./src/assets/road.jpg" alt="road" />
        <p className="slogan">
          Pour ne plus jamais être victime du coup de la panne...
          <br />
          GeoCode est là pour vous !
        </p>
      </div>
    </div>
  );
}
