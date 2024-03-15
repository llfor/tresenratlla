const x= "X";
const o ="O";
let estatJoc = "P1";
const modal = document.querySelector("dialog");
const textModal = modal.querySelector("h2");

const quadrats = Array.from(document.querySelectorAll(".quadrat"));

quadrats.forEach((quadrat,i) =>{
    quadrat.addEventListener("click", ()=>{
        if (estatJoc==="PAUSA") return;
        if (quadrat.textContent!=="") return;
      //  console.log("quadrat", i);
        quadrat.textContent= estatJoc === "P1"? x : o;

        const poscioGuanyadora = hiHaGuanyador();
        if(typeof poscioGuanyadora==="object"){
            guanya(poscioGuanyadora);
            return;
        }
    if(poscioGuanyadora === "empat"){
        mostrarModal("Empat");
    }
    estatJoc = estatJoc === "P1" ? "P2" : "P1";
    })
    
})


function hiHaGuanyador(){
    const tauler = quadrats.map(quadrat => quadrat.textContent );
    console.log(tauler);
    //revisar horitzontals
    for (let i = 0; i <=9 ; i +=3) {
        if( tauler[i] &&
            tauler[i]===tauler[i+1] && 
            tauler[i]=== tauler[i+2]){
                return [i, i+1, i+2];
        }
    }

    //revisar verticals
    for (let i = 0; i <=3 ; i++) {
        if( tauler[i] &&
            tauler[i]===tauler[i+3] && 
            tauler[i]=== tauler[i+6]){
                return [i, i+3, i+6];
        }
    }

    //https://youtu.be/IS_LPeO3cA0?list=PL3Qv7aeTNq0eFnNhR8AXg4Klu-2dajB4i&t=1994

    //revisar diagonals
    if( tauler[0] &&
        tauler[0]===tauler[4] && 
        tauler[0]=== tauler[8]){
            return [0, 4, 8];
    }

    if( tauler[2] &&
        tauler[2]===tauler[4] && 
        tauler[2]=== tauler[6]){
            return [2,4,6];
    }

    if(tauler.includes("")) return false;
    return "empat";

}
function guanya(guanyador){
 //   console.log("Guanya", guanyador);
    guanyador.forEach(posicio =>{
        quadrats[posicio].classList.toggle("guanyador", true);
        })

    mostrarModal("Guanyador: " + estatJoc);
    estatJoc = "PAUSA";

}
function mostrarModal(texte){
    textModal.innerText = texte;
    modal.showModal();
}
modal.querySelector("button").addEventListener("click", () => {
    quadrats.forEach(quadrat => {
        quadrat.textContent="";
        quadrat.classList.toggle("guanyador", false);
        modal.close();
        estatJoc="P1";


    });
    
})