document.querySelector(".js-form");const h=document.querySelector(".js-search-input"),v=document.querySelector(".js-search-btn"),p=document.querySelector(".js-reset-btn");let r=[];const o=document.querySelector(".js-favorites");let a=[];const l=localStorage.getItem("favorites");l&&(a=JSON.parse(l),s());function g(t){t.preventDefault();const n=h.value;n!==""&&S(n)}v.addEventListener("click",g);function j(){r=[],a=[],localStorage.removeItem("favorites"),m(),s()}p.addEventListener("click",j);function S(t){const n=`https://api.jikan.moe/v4/anime?q=${t}`;fetch(n).then(e=>e.json()).then(e=>{r=e.data,m(r)}).catch(e=>console.error("Error en la petición:",e))}const d=document.querySelector(".js-results");function m(t){d.innerHTML="";for(const e of t){let i=e.images.jpg.image_url;i==="https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"&&(i="https://www.svgrepo.com/show/508699/landscape-placeholder.svg");let c="anime-card js-anime-card";a.find(f=>f.mal_id===e.mal_id)&&(c+=" fav-anime-card");const u=`
        <div class="${c}" data-id="${e.mal_id}">
            <img src="${i}" alt="${e.title}">
            <h3>${e.title}</h3>
        </div>
    `;d.innerHTML+=u}const n=document.querySelectorAll(".js-anime-card");for(const e of n)e.addEventListener("click",L)}function L(t){const n=t.currentTarget.dataset.id;if(a.find(i=>i.mal_id===parseInt(n)))return;const e=r.find(i=>i.mal_id===parseInt(n));a.push(e),t.currentTarget.classList.add("fav-anime-card"),localStorage.setItem("favorites",JSON.stringify(a)),s()}function s(){o.innerHTML="";for(const t of a)o.innerHTML+=`
            <div class="anime-card js-favorite-card" data-id="${t.mal_id}">
                <img src="${t.images.jpg.image_url}" alt="${t.title}">
                <h3>${t.title}</h3>
            </div>
        `}
//# sourceMappingURL=main.js.map
