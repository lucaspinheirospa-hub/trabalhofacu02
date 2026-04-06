(function () {
  "use strict";

  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-principal");
  var overlay = document.querySelector(".nav-overlay");
  var links = document.querySelectorAll(".nav-lista a[href^='#']");

  function fecharMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "false");
    nav.classList.remove("aberto");
    if (overlay) overlay.classList.remove("aberto");
    document.body.style.overflow = "";
  }

  function abrirMenu() {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", "true");
    nav.classList.add("aberto");
    if (overlay) overlay.classList.add("aberto");
    document.body.style.overflow = "hidden";
  }

  function alternarMenu() {
    var aberto = toggle.getAttribute("aria-expanded") === "true";
    if (aberto) fecharMenu();
    else abrirMenu();
  }

  if (toggle && nav) {
    toggle.addEventListener("click", alternarMenu);
  }

  if (overlay) {
    overlay.addEventListener("click", fecharMenu);
  }

  links.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.matchMedia("(max-width: 768px)").matches) {
        fecharMenu();
      }
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      fecharMenu();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") fecharMenu();
  });

  var secoes = [];
  links.forEach(function (a) {
    var id = a.getAttribute("href");
    if (id && id.length > 1) {
      var el = document.querySelector(id);
      if (el) secoes.push({ id: id, el: el, link: a });
    }
  });

  var observer;
  if (secoes.length && "IntersectionObserver" in window) {
    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          secoes.forEach(function (s) {
            s.link.classList.toggle("ativo", s.id === id);
          });
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    secoes.forEach(function (s) {
      observer.observe(s.el);
    });
  }

  window.addEventListener("scroll", function () {
    if (observer) return;
    var y = window.scrollY + 120;
    var atual = null;
    secoes.forEach(function (s) {
      if (s.el.offsetTop <= y) atual = s;
    });
    secoes.forEach(function (s) {
      s.link.classList.toggle("ativo", atual && s.link === atual.link);
    });
  });
})();
