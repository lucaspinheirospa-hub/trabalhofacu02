(function () {
  var badgeText = document.querySelector(".hero-visao-badge-text");
  var bars = document.querySelectorAll(".hero-visao-chart .hero-bar");
  var statVals = document.querySelectorAll(".hero-visao-stats .hero-stat-val");

  if (!badgeText || !bars.length || statVals.length < 4) return;

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function updateHeroVisao() {
    badgeText.textContent = "+" + randInt(5, 38) + "% este mês";

    bars.forEach(function (bar) {
      bar.style.setProperty("--h", randInt(28, 98) + "%");
    });

    statVals[0].textContent = "R$" + randInt(95, 320) + "k";
    statVals[1].textContent = "R$" + randInt(18, 95) + "k";
    statVals[2].textContent = String(randInt(0, 10));
    statVals[3].textContent = randInt(88, 100) + "%";
  }

  updateHeroVisao();

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    setInterval(updateHeroVisao, 4500);
  }
})();
