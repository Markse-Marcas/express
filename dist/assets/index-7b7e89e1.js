import{c as m,a as h,t as f}from"./index-57880aa4.js";import{s as u}from"./supabaseClient-fe222147.js";const g=f('<div class="overflow-x-auto"><table id="phases" class="table w-full"><thead><tr><th id="id">ID</th><th id="description">Descrição</th></tr></thead><tbody id="phase-content">'),b=()=>{const[C,d]=m(!1);h(()=>{l()});const l=async()=>{try{d(!0);const{data:e,error:r}=await u.from("phase").select("id, description");if(r)throw r;const p=document.getElementById("phases"),i=document.getElementById("phase-content"),c=document.createElement("tr");e.map(n=>{for(let s in n){let t=document.createElement("td"),o=document.createTextNode(n[s]);if(s=="description"){let a=document.createElement("a");a.className="link",a.href=`/pages/phases/${n.id}`,a.textContent=`${o.textContent}`,t.appendChild(a)}t.appendChild(o),s=="description"&&t.removeChild(o),c.appendChild(t),i?.appendChild(c),p?.appendChild(i)}})}catch(e){e instanceof Error&&alert(e.message)}finally{d(!1)}};return g()};export{b as default};