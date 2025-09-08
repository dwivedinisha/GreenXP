/* Quiz */
const quizData=[
 {q:"Which saves most water?",options:["Long baths","Fix leaks","Water lawn noon","Half loads"],answer:1},
 {q:"Native plants help because…",options:["Need more fertilizer","Support biodiversity","Grow slower","Repel insects"],answer:1},
 {q:"Dispose e-waste?",options:["Bin","Burn","E-waste center","Bury"],answer:2}
];
let qi=0,score=0;
function renderQuiz(){
 const d=quizData[qi];document.getElementById('quizQ').textContent=d.q;
 const opt=document.getElementById('quizOptions');opt.innerHTML='';
 d.options.forEach((o,i)=>{let b=document.createElement('button');b.textContent=o;b.className='quiz-btn';b.onclick=()=>pick(i);opt.appendChild(b)});
 document.getElementById('quizProgress').style.width=`${qi/quizData.length*100}%`;
}
function pick(i){
 const d=quizData[qi];
 [...document.getElementById('quizOptions').children].forEach((b,idx)=>{
   if(idx===d.answer)b.classList.add('correct');else if(idx===i)b.classList.add('wrong');b.disabled=true;
 });
 if(i===d.answer){score+=50;document.getElementById('pts').textContent=score;checkBadges();}
}
document.getElementById('quizNext').onclick=()=>{if(qi<quizData.length-1){qi++;renderQuiz();}};
renderQuiz();

/* Challenges */
document.querySelectorAll('.challenge').forEach(cb=>{
 cb.onchange=()=>{if(cb.checked){score+=+cb.dataset.pts;document.getElementById('pts').textContent=score;checkBadges();}}
});

/* Badges unlock */
function checkBadges(){
 if(score>=50)unlock('badgeRecycle');
 if(score>=100)unlock('badgeWater');
 if(score>=150)unlock('badgeTree');
 if(score>=200)unlock('badgeEnergy');
 if(score>=250)unlock('badgeCommute');
 if(score>=300)unlock('badgePlastic');
 if(score>=400)unlock('badgeChampion');
}
function unlock(id){
 let badge=document.getElementById(id);
 badge.classList.remove('locked');
 badge.classList.add('unlocked');
}

/* Impact Dashboard counters */
function animate(id,target){let el=document.getElementById(id);let val=0;let step=Math.ceil(target/50);let i=setInterval(()=>{val+=step;if(val>=target){val=target;clearInterval(i)}el.textContent=val;},40);}
animate('trees',128);animate('water',540);animate('plastic',320);animate('co2',12);

/* Game */
document.getElementById('playGame').onclick=()=>{document.getElementById('gameIframe').src="https://example.com/godot"}; 
document.getElementById('fullscreenBtn').onclick=()=>document.getElementById('game').requestFullscreen();

/* Upload preview */
function prev(id,prevId){
  const f=document.getElementById(id);
  const img=document.getElementById(prevId);
  f.onchange=()=>{ if(f.files[0]) img.src=URL.createObjectURL(f.files[0]); }
}
prev('before','prevBefore'); prev('after','prevAfter');

/* Verify */
document.getElementById('runVerify').onclick=async () => {
  const beforeFile = document.getElementById('before').files[0];
  const afterFile = document.getElementById('after').files[0];
  const resultDiv = document.getElementById('verifyResult');

  if (!beforeFile || !afterFile) {
    alert("Please select both images.");
    return;
  }

  const formData = new FormData();
  formData.append("image1", beforeFile);
  formData.append("image2", afterFile);
  formData.append("model", "2"); // Using MobileNet as default

  resultDiv.textContent = "Verifying...";
  
  try {
    const response = await fetch("https://planted-greenxp.onrender.com/check_similarity/", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error("Verification failed.");
    }

    const data = await response.json();
    resultDiv.textContent = `Similarity: ${data.similarity_percentage}%`;
  } catch (error) {
    resultDiv.textContent = "Error: " + error.message;
    console.error(error);
  }
};

/* Map Zoom */
const modal=document.createElement('div');
modal.style.position="fixed";modal.style.top=0;modal.style.left=0;modal.style.width="100%";modal.style.height="100%";
modal.style.background="rgba(0,0,0,0.8)";modal.style.display="none";modal.style.alignItems="center";modal.style.justifyContent="center";
modal.innerHTML='<img id="zoomedMap" style="max-width:90%;max-height:90%;border-radius:14px">';
document.body.appendChild(modal);
document.getElementById('mapImage').onclick=()=>{document.getElementById('zoomedMap').src=document.getElementById('mapImage').src;modal.style.display="flex"};
modal.onclick=()=>modal.style.display="none";
