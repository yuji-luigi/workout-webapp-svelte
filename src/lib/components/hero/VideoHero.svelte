<script>
  export let videoSrc; // Accept video source as a prop
</script>

<div class="video-container">
  <video class="video" autoplay loop muted>
    <source src={videoSrc} type="video/mp4" />
  </video>
  <div class="hero-content-container">
    <div class="hero-content-top-right">
      <h1 class="title">Proxy Server</h1>
      <p>Our program is super duper proxy server</p>
      <p>Our program is super duper proxy server</p>
      <p>Our program is super duper proxy server</p>
    </div>
    <div class="hero-content-bottom-left">
      <h2 class="title">Just Do It</h2>
      <p>Our program is super duper proxy server</p>
      <p>Our program is super duper proxy server</p>
      <p>Our program is super duper proxy server</p>
    </div>
  </div>
</div>

<style>
  video {
    height: 100%;
    width: 100%;
    transform: scale(1.2);
    object-fit: cover;
    object-position: center;
    z-index: 0;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .video-container {
    min-height: 100dvh;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    transition: min-height 0.75s ease;
    @media (max-width: 768px) {
      min-height: 50dvh;
    }
    /* overflow: hidden; */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      z-index: 1;
    }
  }
  .hero-content-container {
    display: flex;
    color: var(--text-light);
    flex-direction: column;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    position: absolute;
    padding: 6rem;
    z-index: 1;
  }
  .hero-content-bottom-left {
    margin-top: auto;
    margin-right: auto;
  }
  .hero-content-top-right {
    margin-bottom: auto;
    margin-left: auto;
  }
</style>
