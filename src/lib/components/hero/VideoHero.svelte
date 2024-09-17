<script>
  export let videoSrc; // Accept video source as a prop
</script>

<div>dsaf</div>

<div class="video-container">
  <video class="video" autoplay loop muted>
    <source src={videoSrc} type="video/mp4" />
  </video>
</div>

<style>
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.2);
    z-index: 0;
  }
  .video-container {
    min-width: 100dvw;
    min-height: 100dvh;
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    /* &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1;
    } */
  }
</style>
