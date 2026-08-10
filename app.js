const KEY="sidderaal_demo_bookings";
const form=document.getElementById("bookingForm");
if(form){
  const d=form.querySelector('input[name="date"]');
  d.min=new Date().toISOString().slice(0,10);
  form.addEventListener("submit",e=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(form).entries());
    data.id="BK-"+Date.now().toString().slice(-7);
    data.status="Nieuw";
    data.createdAt=new Date().toISOString();
    const list=JSON.parse(localStorage.getItem(KEY)||"[]");
    list.unshift(data);localStorage.setItem(KEY,JSON.stringify(list));
    document.getElementById("formMsg").textContent="Aanvraag opgeslagen. We nemen zo snel mogelijk contact met je op.";
    form.reset();d.min=new Date().toISOString().slice(0,10);
    const text=`Hallo The Sidderaal, ik wil een afspraak aanvragen.%0A%0ANaam: ${encodeURIComponent(data.name)}%0ADienst: ${encodeURIComponent(data.service)}%0ADatum: ${encodeURIComponent(data.date)}%0ATijd: ${encodeURIComponent(data.time)}%0ATelefoon: ${encodeURIComponent(data.phone)}%0AOmschrijving: ${encodeURIComponent(data.message||"")}`;
    setTimeout(()=>{ if(confirm("Wil je de aanvraag ook via WhatsApp doorsturen?")) window.open("https://wa.me/5994167557?text="+text,"_blank"); },250);
  });
}
if("serviceWorker" in navigator){window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}
