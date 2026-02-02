let pick = document.querySelector(".pick");
let moved = false;

window.addEventListener("scroll", function(){
    let value = this.window.scrollY;
    console.log("scrollY", value);

    if(value>750){
        pick.style.animation = 'unPick 1s ease-out forwards';
    }
    else{
        pick.style.animation = 'pick 1s ease-out';
    }
})