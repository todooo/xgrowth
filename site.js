(function(){
  var c=window.XG||{};
  // --- Google Analytics 4
  if(c.gaId && /^G-[A-Z0-9]+$/.test(c.gaId)){
    var s=document.createElement('script'); s.async=true; s.src='https://www.googletagmanager.com/gtag/js?id='+c.gaId; document.head.appendChild(s);
    window.dataLayer=window.dataLayer||[]; window.gtag=function(){dataLayer.push(arguments);}; gtag('js',new Date()); gtag('config',c.gaId,{anonymize_ip:true});
  }
  window.xgTrack=function(name,params){ if(window.gtag) gtag('event',name,params||{}); };
  // --- Waitlist dialog
  var PLAN={starter:'Starter · €29/mo',coach:'Coach · €149/mo',personal:'Personal · €499/mo'};
  function dialog(plan){
    var old=document.getElementById('wl'); if(old) old.remove();
    var d=document.createElement('div'); d.id='wl'; d.className='wl';
    d.innerHTML='<div class="wl-box" role="dialog" aria-modal="true" aria-labelledby="wl-h">'+
      '<button class="wl-x" aria-label="Close">×</button>'+
      '<div class="eyebrow">'+PLAN[plan]+'</div>'+
      '<h3 id="wl-h">Join the waitlist</h3>'+
      '<p class="wl-p">We open access in small batches so every member gets a real playbook. Leave your X handle and we\'ll DM you when your spot is ready.</p>'+
      '<form class="wl-f" autocomplete="off"><label for="wl-handle" class="sr">Your X handle</label>'+
      '<div class="wl-in"><span>@</span><input id="wl-handle" name="handle" inputmode="text" maxlength="30" placeholder="yourhandle" required></div>'+
      '<button type="submit" class="btn hot">Join the waitlist</button></form>'+
      '<div class="wl-err" hidden>That doesn\'t look like an X handle. Letters, numbers and _ only.</div>'+
      '<div class="wl-ok" hidden><b>You\'re on the list.</b> We\'ll DM <span class="wl-h"></span> on X when your spot opens. Meanwhile, the <a href="/map">map</a> shows what the trend looked like.</div>'+
      '</div>';
    document.body.appendChild(d); document.body.style.overflow='hidden';
    var close=function(){ d.remove(); document.body.style.overflow=''; };
    d.querySelector('.wl-x').addEventListener('click',close);
    d.addEventListener('click',function(e){ if(e.target===d) close(); });
    document.addEventListener('keydown',function esc(e){ if(e.key==='Escape'){ close(); document.removeEventListener('keydown',esc);} });
    var inp=d.querySelector('#wl-handle'); setTimeout(function(){inp.focus();},30);
    d.querySelector('form').addEventListener('submit',function(e){
      e.preventDefault();
      var h=inp.value.trim().replace(/^@/,'').replace(/^https?:\/\/(www\.)?(x|twitter)\.com\//i,'').replace(/[?#/].*$/,'');
      var err=d.querySelector('.wl-err');
      if(!/^[A-Za-z0-9_]{1,15}$/.test(h)){ err.hidden=false; return; }
      err.hidden=true; var btn=d.querySelector('button[type=submit]'); btn.disabled=true; btn.textContent='Saving…';
      fetch('/api/waitlist',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({handle:h,plan:plan})})
        .then(function(r){return r.json();}).then(function(j){
          if(!j.ok) throw new Error(j.error||'fail');
          d.querySelector('form').hidden=true; d.querySelector('.wl-p').hidden=true;
          var ok=d.querySelector('.wl-ok'); ok.querySelector('.wl-h').textContent='@'+h; ok.hidden=false;
          window.xgTrack('waitlist_join',{plan:plan});
        }).catch(function(){ btn.disabled=false; btn.textContent='Join the waitlist'; err.textContent='Could not save. Try again in a moment.'; err.hidden=false; });
    });
    window.xgTrack('waitlist_open',{plan:plan});
  }
  document.querySelectorAll('[data-plan]').forEach(function(a){
    var plan=a.dataset.plan, url=(c.checkout||{})[plan];
    if(!c.waitlist && url && url.indexOf('REPLACE')<0){ a.href=url; a.rel='noopener'; if(c.overlay) a.classList.add('lemonsqueezy-button'); a.addEventListener('click',function(){window.xgTrack('checkout_click',{plan:plan});}); }
    else { a.addEventListener('click',function(e){ e.preventDefault(); dialog(plan); }); }
  });
  var m=document.getElementById('mail'); if(m&&c.contactEmail){ m.href='mailto:'+c.contactEmail; m.textContent=c.contactEmail; }
  var x=document.getElementById('xlink'); if(x&&c.xHandle){ x.href='https://x.com/'+c.xHandle; x.textContent='@'+c.xHandle; }
})();
