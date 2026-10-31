/* NOVA DIGITAL - site behaviour */

/* ===== EDIT THESE ===== */
const CONFIG = {
  whatsappNumber: "15551234567",          // country code + number, digits only
  whatsappMessage: "Hi NOVA DIGITAL, I'd like to discuss a project.",
  email: "hello@novadigital.example"      // receives contact form messages
};

document.documentElement.classList.add("js");
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ----- Contact details from CONFIG ----- */
$("#waBtn").href = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(CONFIG.whatsappMessage)}`;
$("#mailLink").href = `mailto:${CONFIG.email}`;
$("#mailLink").textContent = CONFIG.email;
$("#year").textContent = new Date().getFullYear();

/* ----- Mobile menu ----- */
const burger = $("#burger"), menu = $("#menu");
function setMenu(open) {
  menu.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
menu.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });

/* ----- Header style, back-to-top ----- */
const header = $("#header"), topBtn = $("#top");
function onScroll() {
  header.classList.toggle("scrolled", scrollY > 40);
  topBtn.classList.toggle("on", scrollY > 600);
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();
topBtn.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

/* ----- Scroll reveal ----- */
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
}, { threshold: 0.12 });
$$(".reveal").forEach(el => io.observe(el));

/* ----- Active nav link ----- */
const links = $$(".menu a[href^='#']");
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (!en.isIntersecting) return;
    links.forEach(a => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
$$("main section[id]").forEach(s => spy.observe(s));

/* ----- Portfolio filters ----- */
const filters = $$(".filter"), works = $$(".work");
filters.forEach(btn => btn.addEventListener("click", () => {
  const f = btn.dataset.filter;
  filters.forEach(b => { b.classList.toggle("active", b === btn); b.setAttribute("aria-pressed", b === btn); });
  works.forEach(w => {
    const match = f === "all" || w.dataset.cat.split(" ").includes(f);
    w.classList.toggle("hide", !match);
    w.classList.toggle("show", match);
  });
}));

/* ----- Project modal ----- */
const modal = $("#modal");
$$(".link").forEach(b => b.addEventListener("click", () => {
  $("#mTitle").textContent = b.dataset.title;
  $("#mDesc").textContent = b.dataset.desc;
  modal.showModal();
}));
$("#mClose").addEventListener("click", () => modal.close());
$("#mCta").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

/* ----- Form validation ----- */
const form = $("#form"), status = $("#status");
const rules = {
  name:    v => v.trim().length >= 2 || "Enter your name (at least 2 characters).",
  email:   v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) || "Enter a valid email, like name@example.com.",
  subject: v => v.trim().length >= 3 || "Add a short subject.",
  message: v => v.trim().length >= 10 || "Write at least 10 characters so we can help."
};
function check(field) {
  const result = rules[field.name](field.value);
  const ok = result === true;
  field.classList.toggle("bad", !ok);
  field.setAttribute("aria-invalid", !ok);
  field.nextElementSibling.textContent = ok ? "" : result;
  return ok;
}
$$("input, textarea", form).forEach(f => f.addEventListener("blur", () => check(f)));
form.addEventListener("submit", e => {
  e.preventDefault();
  const fields = $$("input, textarea", form);
  const valid = fields.map(check).every(Boolean);
  status.className = "status";
  if (!valid) { status.textContent = "Please fix the highlighted fields."; fields.find(f => f.classList.contains("bad")).focus(); return; }
  // No backend on GitHub Pages: open the visitor's email app with the message filled in.
  const d = Object.fromEntries(new FormData(form));
  const body = `${d.message}\n\nFrom: ${d.name} (${d.email})`;
  location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(d.subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Thanks! Your email app should open with your message ready to send.";
  status.classList.add("ok");
  form.reset();
});
