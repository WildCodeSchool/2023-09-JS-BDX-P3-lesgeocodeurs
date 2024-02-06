import homeVideo from "../assets/home.video.mp4";

export default function AnimHome() {
  return (
    <div className="anim-wrapper">
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
        viewBox="0 0 285 40"
        preserveAspectRatio="xMidYMid slice"
      >
        <mask id="mask" x="0" y="0" width="100%" height="100%">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <text x="142" y="30" textAnchor="middle">
            GeoCode
          </text>
        </mask>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="white"
          mask="url(#mask)"
        />
      </svg>
    </div>
  );
}
