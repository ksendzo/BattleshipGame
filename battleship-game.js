var table = new Array();
var user = 1;

var br = Array();

var naPotezu = 0;
var protivnik = 1;

var x = -1;
var y = -1;

var rezultat = [10, 10];

var ime = ["", ""];

function ucitavanje() {

    for(let i = 0; i < 2; i++){
        br.push(new Array());
        for(let j = 0; j < 4; j++)
            br[i].push(0);    
    }

    for(let i = 0; i < 2; i++){
        table.push(new Array());
        for(let j = 0; j < 10; j++){
            table[i].push(new Array(10).fill(0));
        }
    }
    let s = ["", ""]
    let name1 = "tabla1=";
    let name2 = "tabla2=";
    let u1 = "username1=";
    let u2 = "username2=";
    let cArray = document.cookie.split(';'); // key1=value1; key2=value2;...
    for(let i = 0; i < cArray.length; i++) {
        let c = cArray[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name1) == 0) {
            s[0] = c.substring(name1.length, c.length);
        }
        if (c.indexOf(name2) == 0){
            s[1] = c.substring(name2.length, c.length);
        }
        if (c.indexOf(u1) == 0){
            ime[0] = c.substring(u1.length, c.length);
            document.getElementById("user1").textContent  = ime[0];
        }
        if (c.indexOf(u2) == 0){
            ime[1] = c.substring(u2.length, c.length);
            document.getElementById("user2").textContent  = ime[1];
        }
    }

    for(let k = 0; k < 2; k++)
    for(let i = 0; i < 10; i++)
    for(let j = 0; j < 10; j++){
        table[k][i][j] = Number(s[k][i*10 + j]);
    }

    ucitajSledecegIgraca();
}

function javiSe(elem){
    if(Number(elem.id[1]) !=  protivnik)
        return;

    x = elem.id[3].charCodeAt(0) - 'a'.charCodeAt(0);
    y = Number(elem.id[5]);

    if(table[protivnik][x][y] == 1){
        table[protivnik][x][y] = -1;
        elem.style.background = "gold";
        obradiPogodak();
        if(rezultat[naPotezu] == 0)
            alert("KRAJ IGRE POBEDIO JE " + ime[naPotezu]);
    }
    if(table[protivnik][x][y] == 0){
        table[protivnik][x][y] = -3;
        elem.style.background = "gray";
        naPotezu = protivnik;
        protivnik = (protivnik + 1) % 2;
        ucitajSledecegIgraca();
    }
}

function ucitajSledecegIgraca(){
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let boja = "green";
            switch(table[naPotezu][i][j]){
                case 1: boja = "blue"; break;
                case 0: boja = "lightblue"; break;
                case -1: boja = "pink"; break;
                case -2: boja = "red"; break;
                case -3: boja = "lightgreen"; break;
            }
            document.getElementById("t" + (naPotezu).toString() + '_' + String.fromCharCode(i +'a'.charCodeAt(0))+ "_" + j.toString()).style.background = boja;
        }
    }
    for(let i = 0; i < 10; i++){
        for(let j = 0; j < 10; j++){
            let boja = "green";
            switch(table[protivnik][i][j]){
                case 1: boja = "lightblue"; break;
                case 0: boja = "lightblue"; break;
                case -1: boja = "gold"; break;
                case -2: boja = "darkred"; break;
                case -3: boja = "gray"; break;
            }
            document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(i +'a'.charCodeAt(0))+ "_" + j.toString()).style.background = boja;

        }
    }
}

function obradiPogodak(){
    if(ceo()){
        rezultat[naPotezu]--;
        document.getElementById("rez" + naPotezu.toString()).textContent  = rezultat[naPotezu].toString();
        promeniUZeleno();
    }
}

function ceo(){
    let x1, y1;

    x1 = x-1;
    y1 = y;
    while(x1 >= 0 && table[protivnik][x1][y1] == -1)
        x1--;
    if(x1 >= 0 && table[protivnik][x1][y1] == 1)
        return false;

    x1 = x+1;
    y1 = y;
    while(x1 <= 9 && table[protivnik][x1][y1] == -1)
        x1++;
    if(x1 <= 9 && table[protivnik][x1][y1] == 1)
        return false;

    x1 = x;
    y1 = y-1;
    while(y1 >= 0 && table[protivnik][x1][y1] == -1)
        y1--;
    if(x1 >= 0 && table[protivnik][x1][y1] == 1)
        return false;

    x1 = x;
    y1 = y+1;
    while(y1 <= 9 && table[protivnik][x1][y1] == -1)
        y1++;
    if(y1 <= 9 && table[protivnik][x1][y1] == 1)
        return false;
        
    return true;
}

function promeniUZeleno(){
    document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(x +'a'.charCodeAt(0))+ "_" + y.toString()).style.background = "darkred";
    table[protivnik][x][y] = -2;

    let x1 = x -1;
    let y1 = y;
    while(x1 >= 0 && table[protivnik][x1][y1] == -1){
        table[protivnik][x1][y1] = -2; 
        document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(x1 +'a'.charCodeAt(0))+ "_" + y1.toString()).style.background = "darkred";
        x1--;
    }

    x1 = x + 1;
    y1 = y;
    while(x1 <= 9 && table[protivnik][x1][y1] == -1){
        table[protivnik][x1][y1] = -2; 
        document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(x1 +'a'.charCodeAt(0))+ "_" + y1.toString()).style.background = "darkred";
        x1++;
    }

    x1 = x;
    y1 = y - 1;
    while(y1 >= 0 && table[protivnik][x1][y1] == -1){
        table[protivnik][x1][y1] = -2; 
        document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(x1 +'a'.charCodeAt(0))+ "_" + y1.toString()).style.background = "darkred";
        y1--;
    }

    x1 = x;
    y1 = y + 1;
    while(y1 <= 9 && table[protivnik][x1][y1] == -1){
        table[protivnik][x1][y1] = -2; 
        document.getElementById("t" + (protivnik).toString() + '_' + String.fromCharCode(x1 +'a'.charCodeAt(0))+ "_" + y1.toString()).style.background = "darkred";
        y1++;
    }
}
