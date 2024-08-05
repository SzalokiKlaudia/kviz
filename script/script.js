const ADATOK = [
    {   id: 0,
        kerdes: 'Mit jelent ha a macskád lassan rád pislog?',
        opciok: ['Nagyon álmos','Éhes','Szomjas','Bizalmat és elégedettséget jelent'],
        jovalasz: 'Bizalmat és elégedettséget jelent',
        kep: 'cat3.jpg'
    },
    {   id: 1,
        kerdes: 'Milyen magasra tudnak macskák ugrani a saját testsúlyukhoz viszonyítva?',
        opciok: ['Kétszeresükre','Háromszorosukra','Négyszeresükre','Ötszörösükre'],
        jovalasz: 'Négyszeresükre',
        kep: 'cat1.jpg'
    },
    {   id: 2,
        kerdes: 'Melyik érzékük a legkifejezőbb az emberi kommunikációval összehasonlítva?',
        opciok: ['Hallás','Tapintás','Szaglás','Látás'],
        jovalasz: 'Látás',
        kep: 'cat2.jpg'
    },
    {   id: 3,
        kerdes: 'Milyen színű a macskákra jellemző irisz',
        opciok: ['Sárga','Kék','Zöld','Barna'],
        jovalasz: 'Zöld',
        kep: 'cat4.jpg'
    },
    {   id: 4,
        kerdes: 'Melyik testrészük lehetővé teszi a macskáknak a nagyugrásokat és a precíz manőverezést?',
        opciok: ['Hátsó lábuk','Farkuk','Fülük','Orruk'],
        jovalasz: 'Hátsó lábuk',
        kep: 'cat5.jpg'
    },
];

let valaszok = []
let aktualisOldal = 0

document.addEventListener('DOMContentLoaded',(event) => {
    foCim()
    megjelenit()
    valaszAktiv()
    kovetkezoKlikk()
    
})

function foCim() { 
    const kontener = document.querySelector('#kontener') 
    const foCim = document.createElement('h1')
    foCim.innerHTML = "KVÍZ: Mennyit tudsz a macskákról ?"
    kontener.prepend(foCim)
    
}

function megjelenit() { //második lefutásként jelenik meg

    const kepBox = document.querySelector('header') //ide rakjuk a képeket ami mindig változik
    const aktKerdes = document.querySelector('#kerdes')
    const buttons = document.querySelectorAll('.opciogomb')


    if(aktualisOldal < ADATOK.length ) { // itt  megjelenítés történik adott indexen ami az aktoldal

        kepBox.innerHTML = ""
        const img = document.createElement('img')
        img.src = 'images/' + ADATOK[aktualisOldal].kep
        aktKerdes.textContent = ADATOK[aktualisOldal].kerdes
        kepBox.append(img)

        buttons.forEach((button,index) => { //akt tomb elemeinek megjelenítése
            button.textContent = ADATOK[aktualisOldal].opciok[index]
            button.classList.remove('active') // minden megjelenítés előtt nullázni kell az osztályokat!!

        });
    }
    
}

function kovetkezoKlikk() { // ötödik lefutás,ha megnyomom a következő gombot növelje az aktoldal idnexet 1-el
    
    const kovetkezoGomb = document.querySelector('#next')
    kovetkezoGomb.addEventListener('click',() => {
        if(aktualisOldal < ADATOK.length-1 ) { //azért hogy ne indexeljünk túl az oldalakon
            aktualisOldal++
            megjelenit()    // és jelenítsük meg az aktuális indexű elemeket egymás után
            
        }
        
        if(aktualisOldal == ADATOK.length-1) { // visszagomb generálása
           const nextBtn = document.querySelector('#next').classList.add('hidden')
           kezdoKepernyo()
            
        }
    })
}

function valaszAktiv() { // ha kattintok egy válaszra akkor.., ez a harmadik lefutás,egyszer hívódik csak meg!!!!
    const buttons = document.querySelectorAll('.opciogomb')
    const opcioBox = document.querySelector('.opcio')


        buttons.forEach(button => { //végigmegyek az összes gombon
            button.addEventListener('click',esemenyKezeloGomb)  // klikk esemény meghívom az esemenykezgomb fgvt
            
        })  
        
}
    


function esemenyKezeloGomb(event){ // ahol az eseménykezeés történik a gomboknak
    const buttons = document.querySelectorAll('.opciogomb');

   buttons.forEach(btn => { // ha mindegyikre kattintasz először midnegyikről leveszi az active osztályt ha van
        btn.classList.remove('active')
        
    })

        const aktualisGomb = event.currentTarget //aktuális gomb amire pont rákattintasz
         aktualisGomb.classList.add('active')
        const text = aktualisGomb.textContent
        //kinyertük a válaszunkat
        valaszokatMentunk(text)

}



function valaszokatMentunk(valasz) { // ez a negyedik fgv amibe beléptünk
  
    valaszok[aktualisOldal] = valasz // itt az aktuálisoldal válaszát mentjük csak el a tömbben
                                    // tomb[0] = éppaktualisvalasz
                                    //tomb[1] = éppaktualisválasz stb.


    if(valaszok.length == ADATOK.length){
        osszesitMutat(valaszok)

    }
    else{
        console.log('mehetek a kövi oldalra')
    }
  
}

function osszesitMutat(valaszokTomb) {
    const osszesitGomb = document.querySelector('#osszesit')
    osszesitGomb.classList.remove('hidden')
    kvizElrejt(osszesitGomb,valaszokTomb)
    
}



function kvizElrejt(osszesit,tomb) {
    const kvizKontener = document.querySelector('#kvizKontener')
    const eredmenyKontener = document.querySelector('#eredmeny')
   
    osszesit.addEventListener('click', () => {
        kvizKontener.classList.add('hidden')
        eredmenyKontener.classList.remove('hidden')
        kiertekelValaszok(tomb)
        
    })

}

function kiertekelValaszok(valaszok) {

    let pontok = 0

    ADATOK.forEach((elem,index) => {
        const {jovalasz} = elem
        
        if(valaszok[index].includes(jovalasz)){ 
            pontok ++

        }

        joValaszMegjelenit(jovalasz)
        
    });
    megjelenitPontok(pontok)
    valaszaimMegjelenit()
   
}

function megjelenitPontok(eredmeny) {

    let tombHossza = ADATOK.length
    const eredmenyBox = document.querySelector('#pontok')

    if(eredmeny != tombHossza){
      
        if(eredmeny == 0){
            alert('Sajnálom 0 pontot kaptál ! :(')
        }
        const p = document.createElement('p')
        p.append(tombHossza,'/',eredmeny + '  pontot kaptál')
        eredmenyBox.append(p)   
    }
    else{
        alert('Gratulálok maximális pontot kaptál !')
        const p = document.createElement('p')
        p.append(tombHossza,'/',eredmeny + '  pontot kaptál')
        eredmenyBox.append(p)
    }
   
    
}

function valaszaimMegjelenit() {
    const valaszaim = document.querySelector('.eredmenyek')

    valaszok.forEach((elem) => {
        const p = document.createElement('p')
        p.textContent = elem
        valaszaim.append(p)
        
    }); 
    
}

function joValaszMegjelenit(joValasz) {
    const joValaszokBox = document.querySelector('#jovalaszok')

    const p = document.createElement('p')
    p.textContent = joValasz
    joValaszokBox.append(p)

   
    
}

function kezdoKepernyo() { 
    const nagyKontener = document.querySelector('#kontener')
    const btnBox = document.createElement('div')
    btnBox.id = 'btnKontener'
    
    const visszaGomb = document.createElement('button')
    visszaGomb.textContent = 'Kezdőképernyő'
    visszaGomb.classList.add('vissza')
    btnBox.append(visszaGomb)
   
           visszaGomb.addEventListener('click',() => {
               location.reload();
           })
           nagyKontener.append(btnBox)

}


