<template>
  <div
    id="component-container"
    class="flex flex-col place-items-center place-content-center min-h-[80vh] space-y-3"
  >
    <h2 id="thank-you" class="text-2xl font-inter tracking-tight">
      <span
        class="glowing border-2 border-[#f86aaf] display-block rounded-full py-1 px-3"
        >Thank you</span
      >
      for your patronage
    </h2>
    <p>An email is on it's way with the details of your order.</p>
    <h1 class="font-antonio font-bold uppercase text-2xl">Order summary:</h1>
  </div>
</template>

<style scoped>
@keyframes glow {
  from {
    background: #520128;
    -webkit-box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
    -moz-box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
    box-shadow: 0px 0px 41px 0px rgba(255, 0, 123, 0.9);
  }
  to {
    background-color: #a1004e;
    -webkit-box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.822);
    -moz-box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.9);
    box-shadow: 0px 0px 23px 9px rgba(255, 0, 123, 0.9);
  }
}
.glowing {
  animation-name: glow;
  animation-duration: 3s;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in;
  /*-webkit-box-shadow: 0px 0px 33px 11px rgba(255, 0, 123, 0.9);
  -moz-box-shadow: 0px 0px 33px 11px rgba(255, 0, 123, 0.9);
  box-shadow: 0px 0px 33px 11px rgba(255, 0, 123, 0.9);*/
}
</style>
