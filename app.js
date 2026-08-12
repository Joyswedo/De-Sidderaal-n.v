const KEY="sidderaal_demo_bookings";
const translations={
  nl:{eyebrow:"INSTALLATIE & TECHNISCHE SERVICE",heroTitle1:"Betrouwbare installaties.",heroTitle2:"Professionele service.",heroLead:"The Sidderaal N.V. helpt met water, elektriciteit en technische installaties voor woning en bedrijf.",bookBtn:"Afspraak maken",whatsappBtn:"Chat via WhatsApp",fastService:"Snelle service",fastServiceText:"Vraag eenvoudig een afspraak of offerte aan.",waterShort:"✓ Water",electricShort:"✓ Elektra",technicalShort:"✓ Techniek",servicesEyebrow:"ONZE DIENSTEN",servicesTitle:"Waarmee kunnen we helpen?",waterTitle:"Waterinstallaties",waterText:"Installatie, onderhoud en reparatie van waterleidingen en sanitair.",electricTitle:"Elektrische installaties",electricText:"Veilige elektrische werkzaamheden, uitbreidingen en storingsservice.",technicalTitle:"Technische service",technicalText:"Praktische technische oplossingen voor woningen, winkels en bedrijven.",bookingEyebrow:"AFSPRAAK AANVRAGEN",bookingTitle:"Plan een servicebezoek",bookingText:"Vul je gegevens in. Je aanvraag wordt lokaal in deze demo opgeslagen en kan daarna via WhatsApp worden doorgestuurd.",notice:"Voor een echte productieomgeving moet de demo-opslag nog worden gekoppeld aan een online database.",nameLabel:"Naam",namePlaceholder:"Voor- en achternaam",phoneLabel:"Telefoon",emailLabel:"E-mail",emailPlaceholder:"naam@email.com",serviceLabel:"Dienst",serviceChoose:"Kies een dienst",quoteService:"Offerte / inspectie",dateLabel:"Voorkeursdatum",timeLabel:"Voorkeurstijd",timeChoose:"Kies",messageLabel:"Omschrijving",messagePlaceholder:"Vertel kort wat er nodig is...",submitBtn:"Aanvraag versturen",iphoneEyebrow:"IPHONE & ANDROID",installTitle:"Zet The Sidderaal op je beginscherm",installText:"Open deze website in Safari of Chrome → Deel/Menu → Toevoegen aan beginscherm → Voeg toe.",adminBtn:"Admin Dashboard",footerServices:"Water • Elektriciteit • Technische service",saved:"Aanvraag opgeslagen. We nemen zo snel mogelijk contact met je op.",waConfirm:"Wil je de aanvraag ook via WhatsApp doorsturen?",waIntro:"Hallo The Sidderaal, ik wil een afspraak aanvragen."},
  en:{eyebrow:"INSTALLATION & TECHNICAL SERVICE",heroTitle1:"Reliable installations.",heroTitle2:"Professional service.",heroLead:"The Sidderaal N.V. provides water, electrical and technical installation services for homes and businesses.",bookBtn:"Book an appointment",whatsappBtn:"Chat via WhatsApp",fastService:"Fast service",fastServiceText:"Easily request an appointment or a quote.",waterShort:"✓ Water",electricShort:"✓ Electrical",technicalShort:"✓ Technical",servicesEyebrow:"OUR SERVICES",servicesTitle:"How can we help?",waterTitle:"Water installations",waterText:"Installation, maintenance and repair of water lines and sanitary systems.",electricTitle:"Electrical installations",electricText:"Safe electrical work, upgrades and troubleshooting services.",technicalTitle:"Technical service",technicalText:"Practical technical solutions for homes, shops and businesses.",bookingEyebrow:"REQUEST AN APPOINTMENT",bookingTitle:"Schedule a service visit",bookingText:"Enter your details. In this demo, your request is saved locally and can then be sent through WhatsApp.",notice:"For a real production environment, demo storage still needs to be connected to an online database.",nameLabel:"Name",namePlaceholder:"First and last name",phoneLabel:"Phone",emailLabel:"Email",emailPlaceholder:"name@email.com",serviceLabel:"Service",serviceChoose:"Choose a service",quoteService:"Quote / inspection",dateLabel:"Preferred date",timeLabel:"Preferred time",timeChoose:"Choose",messageLabel:"Description",messagePlaceholder:"Briefly tell us what you need...",submitBtn:"Send request",iphoneEyebrow:"IPHONE & ANDROID",installTitle:"Add The Sidderaal to your home screen",installText:"Open this website in Safari or Chrome → Share/Menu → Add to Home Screen → Add.",adminBtn:"Admin Dashboard",footerServices:"Water • Electrical • Technical service",saved:"Request saved. We will contact you as soon as possible.",waConfirm:"Would you also like to send the request through WhatsApp?",waIntro:"Hello The Sidderaal, I would like to request an appointment."}
};
const serviceLabels={water:{nl:"Waterinstallaties",en:"Water installations"},electric:{nl:"Elektrische installaties",en:"Electrical installations"},technical:{nl:"Technische service",en:"Technical service"},quote:{nl:"Offerte / inspectie",en:"Quote / inspection"}};
let lang=localStorage.getItem("sidderaal_lang")||"nl";
function t(k){return (translations[lang]||translations.nl)[k]||k;}
function applyLanguage(){
  document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el=>el.placeholder=t(el.dataset.i18nPlaceholder));
  document.querySelectorAll("[data-lang]").forEach(b=>b.classList.toggle("active",b.dataset.lang===lang));
  document.title=lang==="en"?"The Sidderaal N.V. — Installation & Technical Service":"The Sidderaal N.V.";
  const waText=encodeURIComponent(lang==="en"?"Hello The Sidderaal, I have a question.":"Hallo The Sidderaal, ik heb een vraag.");
  document.querySelectorAll(".top-wa").forEach(a=>a.href="https://wa.me/5994167557?text="+waText);
  const chatText=encodeURIComponent(lang==="en"?"Hello The Sidderaal, I would like information.":"Hallo The Sidderaal, ik wil graag informatie.");
  const chat=document.querySelector(".actions .ghost"); if(chat) chat.href="https://wa.me/5994167557?text="+chatText;
  const s=document.querySelector('select[name="service"]'); if(s){[...s.options].forEach(o=>{if(serviceLabels[o.value])o.textContent=serviceLabels[o.value][lang];});}
}
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{lang=b.dataset.lang;localStorage.setItem("sidderaal_lang",lang);applyLanguage();}));
applyLanguage();
const form=document.getElementById("bookingForm");
if(form){
  const d=form.querySelector('input[name="date"]');
  d.min=new Date().toISOString().slice(0,10);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    data.id="BK-"+Date.now().toString().slice(-7); data.status="Nieuw"; data.createdAt=new Date().toISOString(); data.language=lang;
    const list=JSON.parse(localStorage.getItem(KEY)||"[]"); list.unshift(data); localStorage.setItem(KEY,JSON.stringify(list));
    document.getElementById("formMsg").textContent=t("saved"); form.reset(); d.min=new Date().toISOString().slice(0,10); applyLanguage();
    const service=serviceLabels[data.service]?serviceLabels[data.service][lang]:data.service;
    const text=encodeURIComponent(`${t("waIntro")}\n\n${t("nameLabel")}: ${data.name}\n${t("serviceLabel")}: ${service}\n${t("dateLabel")}: ${data.date}\n${t("timeLabel")}: ${data.time}\n${t("phoneLabel")}: ${data.phone}\n${t("messageLabel")}: ${data.message||""}`);
    setTimeout(()=>{if(confirm(t("waConfirm")))window.open("https://wa.me/5994167557?text="+text,"_blank");},250);
  });
}
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}
