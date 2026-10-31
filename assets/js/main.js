(() => {
 const API=(window.APP_CONFIG?.API_BASE_URL||"").replace(/\/$/,"");
 const $=(s)=>document.querySelector(s);
 const money=(n)=>new Intl.NumberFormat("fa-IR").format(n)+" تومان";
 async function api(path,options={}) {
  if(!API||API.includes("YOUR-WORKER")) throw new Error("آدرس API هنوز تنظیم نشده است.");
  const res=await fetch(API+path,{...options,headers:{"Content-Type":"application/json",...(options.headers||{})}});
  const data=await res.json().catch(()=>({error:"پاسخ نامعتبر سرور"}));
  if(!res.ok) throw new Error(data.error||"خطا در ارتباط با سرور");
  return data;
 }
 function serviceCard(s){return `<article class="service-card"><span class="service-index">SERVICE / ${String(s.id).padStart(2,"0")}</span><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description||"با دقت و ظرافت حرفه‌ای")}</p><div class="service-bottom"><strong>${money(s.price)}</strong><span>${s.duration_minutes} دقیقه</span></div></article>`}
 function escapeHtml(v=""){return String(v).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
 async function loadServices(){
  try{const {services}=await api("/api/services");$("#services-grid").innerHTML=services.length?services.map(serviceCard).join(""):'<p>هنوز خدمتی ثبت نشده است.</p>';$("#booking-service").innerHTML='<option value="">انتخاب خدمت</option>'+services.map(s=>`<option value="${s.id}">${escapeHtml(s.name)} — ${money(s.price)}</option>`).join("");}
  catch(e){$("#services-grid").innerHTML='<p class="empty-state">برای مشاهده تعرفه‌ها، اتصال سرور باید تنظیم شود.</p>';$("#booking-service").innerHTML='<option value="">فعلاً امکان دریافت خدمات نیست</option>';}
 }
 async function loadPosts(){
  try{const {posts}=await api("/api/posts");$("#posts-grid").innerHTML=posts.length?posts.map(p=>`<article class="post-card"><img src="${API+ p.image_url}" alt="${escapeHtml(p.title)}" loading="lazy"><div><h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.description||"")}</p></div></article>`).join(""):'<p class="gallery-placeholder">هنوز نمونه‌کاری منتشر نشده است.</p>';}
  catch{$("#posts-grid").innerHTML='<p class="gallery-placeholder">نمونه‌کارها پس از اتصال سرور نمایش داده می‌شوند.</p>';}
 }
 $("#booking-form").addEventListener("submit",async e=>{e.preventDefault();const form=e.currentTarget,btn=form.querySelector("button"),msg=$("#booking-message");btn.disabled=true;msg.textContent="در حال ارسال درخواست...";msg.className="form-message";
  const data=Object.fromEntries(new FormData(form).entries());
  try{await api("/api/appointments",{method:"POST",body:JSON.stringify(data)});msg.textContent="درخواست شما ثبت شد. پس از بررسی آرایشگر، نتیجه اطلاع‌رسانی می‌شود.";msg.classList.add("success");form.reset();}
  catch(err){msg.textContent=err.message;msg.classList.add("error");}finally{btn.disabled=false;}
 });
 const dateInput=document.querySelector('input[name="appointment_date"]');if(dateInput){const d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());dateInput.min=d.toISOString().slice(0,10);}
 $(".menu-toggle").addEventListener("click",()=>$(".main-nav").classList.toggle("open"));
 document.querySelectorAll(".main-nav a").forEach(a=>a.addEventListener("click",()=>$(".main-nav").classList.remove("open")));
 loadServices();loadPosts();
})();