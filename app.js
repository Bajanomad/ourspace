/* davidspace app: data, localStorage plumbing, rendering.
   Patterns borrowed from the Moreno family demo: data as plain arrays,
   string-built HTML, and a client-side demo password gate for the owner.
   Demo only: the password check runs in the browser. A production version
   would use real member accounts with server-side authentication. */

var OWNER_PASSWORD = "davidspace2026";
var LS_PROFILE = "davidspace.profile";
var LS_COMMENTS = "davidspace.comments";
var LS_BULLETINS = "davidspace.bulletins";
var SS_OWNER = "davidspace.owner";

/* ================= DEFAULT PROFILE (editable in owner mode) ================= */
var DEFAULT_PROFILE = {
  headline: "\"Somewhere between the desert and the ocean.\"",
  mood: "Curious",
  moodFace: ":)",
  about: "I live in Pescadero, on the Pacific side of Baja California Sur, where the desert runs down into the ocean. I build websites, chase good stories, and keep a small circle of good people scattered across three countries. This page is our corner of the internet, run the old way: no algorithm, no ads, no strangers. Just us. Leave a comment so I know you found it.",
  meet: "The friends I already have, more often. And anyone who still believes the internet was better when your page played a song, your Top 8 meant something, and Tom was everybody's first friend."
};

/* ================= FRIENDS (the member data model) ================= */
/* top: true puts a friend in the Top 8 grid. placeholder: true is an open seat. */
var FRIENDS = [
  {name:"Miles", loc:"On the road, somewhere",        color:"#3366cc", top:true,  note:"Called the Top 8 shot before the page was even live."},
  {name:"Caleb", loc:"Baja California Sur, Mexico",   color:"#2a9d8f", top:true,  note:"Closest friend down here. Keeper of the carne asada calendar."},
  {name:"Tom",   loc:"Santa Monica, California",      color:"#003399", top:true,  note:"Your first friend. It is tradition. He was everybody's first friend."},
  {name:"Seat Open", loc:"", color:"#999999", top:true, placeholder:true, note:"Reserved for a friend who has not been added yet."},
  {name:"Seat Open", loc:"", color:"#999999", top:true, placeholder:true, note:"Reserved for a friend who has not been added yet."},
  {name:"Seat Open", loc:"", color:"#999999", top:true, placeholder:true, note:"Reserved for a friend who has not been added yet."},
  {name:"Seat Open", loc:"", color:"#999999", top:true, placeholder:true, note:"Reserved for a friend who has not been added yet."},
  {name:"Seat Open", loc:"", color:"#999999", top:true, placeholder:true, note:"Reserved for a friend who has not been added yet."}
];

/* ================= SEED CONTENT (first visit only) ================= */
function seedComments(){
  return [
    {id:"c2", name:"Caleb", color:"#2a9d8f",
     date:"2026-11-17T18:30:00",
     text:"Took you long enough. This already beats the group chat. Say the word and the carne asada is on, my place or yours."},
    {id:"c1", name:"Miles", color:"#3366cc",
     date:"2026-11-16T21:05:00",
     text:"First. Calling it now: this page needs a profile song and at least one glitter graphic before it is official. Good to see you back on the internet, brother."}
  ];
}
function seedBulletins(){
  return [
    {id:"b1", subject:"This page is live",
     date:"2026-11-18T09:00:00",
     body:"Bulletin to all my friends: I built us a MySpace, like the old days. Leave a comment, check your Top 8 status, and do not take it personally. More friends get added as I track you all down across Mexico, the States and Europe. You know who you are."}
  ];
}

/* ================= STORAGE ================= */
function load(key, seedFn){
  try {
    var raw = localStorage.getItem(key);
    if(raw) return JSON.parse(raw);
  } catch(e){}
  var fresh = seedFn();
  save(key, fresh);
  return fresh;
}
function save(key, val){
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e){}
}
var profile  = load(LS_PROFILE,  function(){ return DEFAULT_PROFILE; });
var comments = load(LS_COMMENTS, seedComments);
var bulletins = load(LS_BULLETINS, seedBulletins);
var owner = sessionStorage.getItem(SS_OWNER) === "1";

/* ================= HELPERS ================= */
function esc(s){
  return String(s == null ? "" : s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function initials(name){
  return name.split(" ").map(function(w){ return w.charAt(0); }).join("").slice(0,2).toUpperCase();
}
var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
function fmtDate(iso){
  var d = new Date(iso);
  if(isNaN(d)) return "";
  return MONTHS[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear();
}
function photoDiv(f, cls){
  if(f.placeholder) return '<div class="'+cls+'">seat<br>open</div>';
  return '<div class="'+cls+'" style="background:'+f.color+'">'+initials(f.name)+'</div>';
}

/* ================= RENDER: PROFILE ================= */
function renderProfile(){
  document.getElementById("headlineText").textContent = profile.headline;
  document.getElementById("moodText").textContent = profile.mood;
  document.getElementById("moodFace").textContent = profile.moodFace;
  document.getElementById("aboutText").textContent = profile.about;
  document.getElementById("meetText").textContent = profile.meet;
}

/* ================= RENDER: FRIENDS ================= */
function renderFriends(){
  var real = FRIENDS.filter(function(f){ return !f.placeholder; });
  document.getElementById("friendCount").textContent = real.length;

  var top = FRIENDS.filter(function(f){ return f.top; });
  document.getElementById("top8Grid").innerHTML = top.map(function(f){
    if(f.placeholder){
      return '<div class="friend open">' + photoDiv(f,"fphoto") +
        '<div class="fname">Seat Open</div><div class="floc">could be you</div></div>';
    }
    return '<div class="friend">' + photoDiv(f,"fphoto") +
      '<div class="fname"><a href="#">' + esc(f.name) + '</a></div>' +
      '<div class="floc">' + esc(f.loc) + '</div></div>';
  }).join("");

  document.getElementById("friendList").innerHTML = real.map(function(f){
    return '<div class="friend-row">' + photoDiv(f,"fphoto-sm") +
      '<div><span class="fn">' + esc(f.name) + '</span> <span class="fl">' + esc(f.loc) + '</span>' +
      '<div class="fl">' + esc(f.note) + '</div></div></div>';
  }).join("");
}
document.getElementById("viewAllFriends").addEventListener("click", function(e){
  e.preventDefault();
  var box = document.getElementById("allFriends");
  var open = box.classList.toggle("hidden") === false;
  this.textContent = open ? "Hide All of David's Friends" : "View All of David's Friends";
});

/* ================= RENDER: COMMENTS ================= */
function renderComments(){
  document.getElementById("commentCount").textContent = comments.length;
  document.getElementById("commentList").innerHTML = comments.map(function(c){
    var who = {name:c.name, color:c.color || "#666699", placeholder:false};
    return '<div class="comment"><div class="c-who">' + photoDiv(who,"fphoto") +
      '<div class="fname"><a href="#">' + esc(c.name) + '</a></div></div>' +
      '<div class="c-body">' +
      (owner ? '<a href="#" class="del" data-del-comment="' + c.id + '">delete</a>' : '') +
      '<div class="c-date">' + fmtDate(c.date) + '</div>' + esc(c.text) + '</div></div>';
  }).join("");
  wireDeletes();
}
document.getElementById("commentForm").addEventListener("submit", function(e){
  e.preventDefault();
  var name = document.getElementById("commentName").value.trim();
  var text = document.getElementById("commentText").value.trim();
  if(!name || !text){ return; }
  comments.unshift({
    id: "c" + Date.now(), name: name, color: "#7a4a21",
    date: new Date().toISOString(), text: text
  });
  save(LS_COMMENTS, comments);
  document.getElementById("commentText").value = "";
  renderComments();
});

/* ================= RENDER: BULLETINS ================= */
function renderBulletins(){
  document.getElementById("bulletinList").innerHTML = bulletins.map(function(b){
    return '<div class="bulletin">' +
      (owner ? '<a href="#" class="del" data-del-bulletin="' + b.id + '">delete</a>' : '') +
      '<span class="b-subj">' + esc(b.subject) + '</span> ' +
      '<span class="b-date">' + fmtDate(b.date) + '</span>' +
      '<div class="b-body">' + esc(b.body) + '</div></div>';
  }).join("");
  wireDeletes();
}
document.getElementById("bulletinForm").addEventListener("submit", function(e){
  e.preventDefault();
  var subj = document.getElementById("bulletinSubject").value.trim();
  var body = document.getElementById("bulletinBody").value.trim();
  if(!subj || !body){ return; }
  bulletins.unshift({id:"b" + Date.now(), subject:subj, body:body, date:new Date().toISOString()});
  save(LS_BULLETINS, bulletins);
  document.getElementById("bulletinSubject").value = "";
  document.getElementById("bulletinBody").value = "";
  renderBulletins();
});

/* ================= DELETE WIRING ================= */
function wireDeletes(){
  document.querySelectorAll("[data-del-comment]").forEach(function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      comments = comments.filter(function(c){ return c.id !== a.dataset.delComment; });
      save(LS_COMMENTS, comments);
      renderComments();
    });
  });
  document.querySelectorAll("[data-del-bulletin]").forEach(function(a){
    a.addEventListener("click", function(e){
      e.preventDefault();
      bulletins = bulletins.filter(function(b){ return b.id !== a.dataset.delBulletin; });
      save(LS_BULLETINS, bulletins);
      renderBulletins();
    });
  });
}

/* ================= OWNER GATE (demo pattern) ================= */
function applyOwner(){
  document.getElementById("ownerLocked").classList.toggle("hidden", owner);
  document.getElementById("ownerOpen").classList.toggle("hidden", !owner);
  document.querySelectorAll(".owner-only").forEach(function(el){
    el.classList.toggle("hidden", !owner);
  });
  renderComments();
  renderBulletins();
}
document.getElementById("ownerUnlock").addEventListener("click", function(){
  var val = document.getElementById("ownerPw").value.trim();
  var err = document.getElementById("ownerErr");
  var bar = document.querySelector(".owner-bar");
  if(val === OWNER_PASSWORD){
    owner = true;
    sessionStorage.setItem(SS_OWNER, "1");
    err.textContent = "";
    document.getElementById("ownerPw").value = "";
    applyOwner();
  } else {
    err.textContent = "Not the owner password.";
    bar.classList.remove("shake"); void bar.offsetWidth; bar.classList.add("shake");
  }
});
document.getElementById("ownerLock").addEventListener("click", function(){
  owner = false;
  sessionStorage.removeItem(SS_OWNER);
  document.getElementById("editForm").classList.add("hidden");
  applyOwner();
});
document.getElementById("showEdit").addEventListener("click", function(){
  var f = document.getElementById("editForm");
  document.getElementById("editHeadline").value = profile.headline;
  document.getElementById("editMood").value = profile.mood;
  document.getElementById("editMoodFace").value = profile.moodFace;
  document.getElementById("editAbout").value = profile.about;
  document.getElementById("editMeet").value = profile.meet;
  f.classList.toggle("hidden");
});
document.getElementById("editForm").addEventListener("submit", function(e){
  e.preventDefault();
  profile.headline = document.getElementById("editHeadline").value.trim() || profile.headline;
  profile.mood = document.getElementById("editMood").value.trim() || profile.mood;
  profile.moodFace = document.getElementById("editMoodFace").value;
  profile.about = document.getElementById("editAbout").value.trim() || profile.about;
  profile.meet = document.getElementById("editMeet").value.trim() || profile.meet;
  save(LS_PROFILE, profile);
  renderProfile();
  this.classList.add("hidden");
});

/* ================= INIT ================= */
(function(){
  var now = new Date();
  document.getElementById("lastLogin").textContent =
    (now.getMonth()+1) + "/" + now.getDate() + "/" + now.getFullYear();
  renderProfile();
  renderFriends();
  applyOwner();
})();
