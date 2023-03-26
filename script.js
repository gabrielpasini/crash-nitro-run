const crash = document.querySelector(".crash");
const nitro = document.querySelector(".nitro");
const ground = document.querySelector(".ground");
const cloud = document.querySelector(".cloud");

function jump() {
  crash.classList.add("jump");

  setTimeout(() => {
    crash.classList.remove("jump");
  }, 600);
}

function death({
  nitroPosition,
  groundPosition,
  cloudPosition,
  crashPosition,
}) {
  cloud.style.animation = "none";
  ground.style.animation = "none";
  nitro.style.animation = "none";

  ground.style.left = `${groundPosition}px`;
  cloud.style.left = `${cloudPosition}px`;
  nitro.style.left = `${nitroPosition}px`;
  crash.style.bottom = `${crashPosition}px`;

  crash.src = "./images/death.png";
  crash.classList.add("death");
  setTimeout(() => {
    crash.remove();
  }, 5900);
}

const loop = setInterval(() => {
  const nitroPosition = nitro.offsetLeft;
  const groundPosition = ground.offsetLeft;
  const cloudPosition = cloud.offsetLeft;
  const crashPosition = +window
    .getComputedStyle(crash)
    .bottom.replace("px", "");

  if (nitroPosition <= 220 && nitroPosition > 0 && crashPosition < 80) {
    death({ nitroPosition, groundPosition, cloudPosition, crashPosition });
    clearInterval(loop);
  }
}, 10);

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);
