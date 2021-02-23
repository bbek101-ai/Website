let h1Anim = gsap.timeline({defaults:{duration:1}});
var rule = CSSRulePlugin.getRule(".banner::after");

function contentAnimation(){
      h1Anim.addLabel("svg")
      .from('svg',{x:200,scale:1.4, opacity:0,ease:"linear",duration:.55},"svg")
      .from('.back',{y:-60,opacity:0,ease:"linear",duration:.55},"svg")
      .from('.main',{y:60,opacity:0,ease:"linear",duration:.55},"svg")
      .from('.stagger',{y:-60,opacity:0, stagger:.35, ease:"linear",duration:.45},"-=.5");

      let t2 = gsap.timeline({defaults:{duration:1}});
      t2.from(rule, {duration: 2, cssRule: {scaleY:1}});
}


var hamburger = document.querySelector(".navbar__burger");
var navbarNav = document.querySelector(".navbar__nav");
var body = document.querySelector("body");
hamburger.addEventListener('click', ()=>{
      navbarNav.classList.toggle('open');
      body.classList.toggle('open');
      hamburger.classList.toggle('open');
      if(body.className=='open'){
            body.style="overflow-y:hidden;margin:0";
      }
      else{
            body.style="overflow-y:none;margin:0";
      }
      
});

function leaveAnimation(){
    
   gsap.to('.transitions li',{duration:.5, scaleY:1, transformOrigin:'bottom left', stagger:.1});
      

}

function enterAnimation(){
     
     gsap.to('.transitions li',{duration:.5, scaleY:0,skewX:0, transformOrigin:'top left',ease:power1.out, stagger:.1,delay:1});
      gsap.call(contentAnimation)
  }
  


barba.init({
      
      transitions:[{
            name:'default-transition',
            async leave(data){
                  await leaveAnimation()
                  data.current.container.remove()
                  
            },
            async enter(data){
                  await enterAnimation();
            },
            async once(data){
                  await contentAnimation();
            }
            
      }]
})