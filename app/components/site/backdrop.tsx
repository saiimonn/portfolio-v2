// Red drifting gradient + grain behind every page; fixed so long pages keep it while scrolling
const Backdrop = () => (
  <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
    <div className="hero-gradient">
      <span />
      <span />
      <span />
    </div>
    <div className="absolute inset-0 bg-black/30" />
    <div className="grain-overlay opacity-[0.06]" />
  </div>
);

export default Backdrop;
