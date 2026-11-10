/* =========================================================
   ESPAÇO TERAPÊUTICO INOVAR — configurações fáceis de editar
   ========================================================= */

// EDITAR: número do WhatsApp só com números: 55 + DDD + número.
// Exemplo: "5519999998888". Enquanto estiver vazio, os botões levam ao Instagram.
const WHATSAPP = "";

// Mensagem que já aparece escrita quando o cliente abre o WhatsApp
const MENSAGEM = "Olá! Vim pelo site e gostaria de agendar uma avaliação no Espaço Terapêutico Inovar.";

const INSTAGRAM = "https://www.instagram.com/espacoterapeuticoinovar/";

/* ========= Daqui para baixo não precisa mexer ========= */
document.documentElement.classList.add("js");

// Botões de WhatsApp
const linkWhats = WHATSAPP
  ? "https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(MENSAGEM)
  : INSTAGRAM;

document.querySelectorAll("[data-whats]").forEach(function (botao) {
  botao.href = linkWhats;
  botao.target = "_blank";
  botao.rel = "noopener";
});

// Mostra o número formatado no bloco de contato
if (WHATSAPP) {
  const n = WHATSAPP.replace(/^55/, "");
  const formatado = "(" + n.slice(0, 2) + ") " + n.slice(2, -4) + "-" + n.slice(-4);
  document.querySelectorAll("[data-whats-texto]").forEach(function (el) { el.textContent = formatado; });
}

// Fotos opcionais: se a foto não existir na pasta, ela some sem deixar buraco
document.querySelectorAll("img[data-opcional]").forEach(function (img) {
  function remover() {
    const galeria = img.closest(".galeria");
    img.remove();
    if (galeria && !galeria.querySelector("img")) galeria.hidden = true;
  }
  if (img.complete && img.naturalWidth === 0) remover();
  else img.addEventListener("error", remover);
});

// Menu do celular
const corpo = document.body;
const botaoMenu = document.getElementById("hamburguer");
function fecharMenu() {
  corpo.classList.remove("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
}
botaoMenu.addEventListener("click", function () {
  const aberto = corpo.classList.toggle("menu-aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
  botaoMenu.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
});
document.querySelectorAll("#menu a").forEach(function (link) {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    const alvo = /^#\w/.test(href) ? document.querySelector(href) : null;
    fecharMenu();
    if (alvo) { // fecha o menu primeiro e depois rola até a seção
      e.preventDefault();
      alvo.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", link.getAttribute("href"));
    }
  });
});
document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(); });

// Topo muda de fundo ao rolar
const topo = document.getElementById("topo");
function aoRolar() { topo.classList.toggle("rolou", window.scrollY > 20); }
window.addEventListener("scroll", aoRolar, { passive: true });
aoRolar();

// Animações de entrada e link ativo no menu
if ("IntersectionObserver" in window) {
  const obsRevela = new IntersectionObserver(function (itens) {
    itens.forEach(function (item) {
      if (item.isIntersecting) { item.target.classList.add("visivel"); obsRevela.unobserve(item.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".revela").forEach(function (el) { obsRevela.observe(el); });

  const links = document.querySelectorAll(".menu a[href^='#']");
  const obsSecao = new IntersectionObserver(function (itens) {
    itens.forEach(function (item) {
      if (item.isIntersecting) {
        links.forEach(function (l) { l.classList.toggle("ativo", l.getAttribute("href") === "#" + item.target.id); });
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main section[id]").forEach(function (s) { obsSecao.observe(s); });
} else {
  document.querySelectorAll(".revela").forEach(function (el) { el.classList.add("visivel"); });
}

// Ano automático no rodapé
document.getElementById("ano").textContent = new Date().getFullYear();
