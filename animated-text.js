const textEl = document.querySelector(".animated-text");

const first = "I'm not going to stop the wheel";
const second = "I'm going to break the wheel";

function type(text, fadeIn, done) {
  textEl.innerHTML = "";
  let i = 0;
  let opacity = fadeIn ? 0 : 1;
  textEl.style.opacity = opacity;

  const interval = setInterval(() => {
    const span = document.createElement("span");
    span.textContent = text[i];
    span.style.filter = "blur(6px)";
    span.style.opacity = "0";
    span.style.transition = "0.35s ease";

    textEl.appendChild(span);

    requestAnimationFrame(() => {
      span.style.filter = "blur(0)";
      span.style.opacity = "1";
    });

    if (fadeIn && opacity < 1) {
      opacity += 0.04;
      textEl.style.opacity = opacity;
    }

    i++;
    if (i === text.length) {
      clearInterval(interval);
      setTimeout(done, 900);
    }
  }, 55);
}

function fadeOut(done) {
  let o = 1;
  const f = setInterval(() => {
    o -= 0.04;
    textEl.style.opacity = o;
    if (o <= 0) {
      clearInterval(f);
      done();
    }
  }, 30);
}

function loop() {
  type(first, true, () => {
    fadeOut(() => {
      type(second, true, () => {
        fadeOut(() => setTimeout(loop, 400));
      });
    });
  });
}

loop();
