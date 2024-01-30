import homeVideo from "../assets/home.video.mp4";

export default function AnimHome() {
  return (
    <>
      <div className="slogan">
        <div className="slogan-home" />
      </div>
      <div className="wrapper">
        <video
          autoPlay
          playsInline
          muted
          loop
          poster="http://i.imgur.com/xHO6DbC.png"
        >
          <source src={homeVideo} type="video/mp4" />
        </video>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 285 80"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <mask id="mask" x="0" y="0" width="100%" height="100%">
              <rect x="0" y="0" width="100%" height="100%" />
              <text x="72" y="50">
                GeoCode
              </text>
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" />
        </svg>
      </div>
      <span> Pour ne plus jamais être victime du coup de la panne...</span>
    </>
  );
}
