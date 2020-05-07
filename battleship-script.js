var tabla = new Array(); // Tabla
var trTabla = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];
var uspesnoKrenulo = false;
var br1 = 4;
var br2 = 3;
var br3 = 2;
var br4 = 1;
var n = 0;
var user1 = true;

function pocetak(){
    //tabla = new Array;
    for(let i = 0; i < 10; i += 1){
        tabla.push(new Array(10).fill(0));
    }
    br1 = 4;
    br2 = 3;
    br3 = 2;
    br4 = 1;
    n = 0;
}

function loadUsernames(){  
    document.cookie = "username1=" + document.formWelcome.user1.value;
    document.cookie = "username2=" + document.formWelcome.user2.value;
    localStorage.setItem("username1", document.formWelcome.user1.value);
    localStorage.setItem("username2", document.formWelcome.user2.value);
    window.open("battleship-setup.html", "_self");
}

function slobodan(x, y){ // da li je [x, y] slobodno
    return tabla[x][y] == 0;
}

function nijeU(x,y){
    if((trTabla[0][0] == x && trTabla[0][1] == y) || (trTabla[1][0] == x &&  trTabla[1][1]== y) || (trTabla[2][0] == x &&  trTabla[2][1]== y) || (trTabla[3][0] == x &&  trTabla[3][1]== y)){
        return false;
    }
    return true;
}

function javi(elem){
    let x = elem.id[2].charCodeAt(0) - 'a'.charCodeAt(0);
    let y = Number(elem.id[4]);

    trTabla[0][0] = x;
    trTabla[0][1] = y;
    if(slobodan(x,y)){
        uspesnoKrenulo = true;
        n = 1;
        elem.style.background = "green";
    }
}

function dodaj(elem){
    let x = elem.id[2].charCodeAt(0) - 'a'.charCodeAt(0);
    let y = Number(elem.id[4]);

    if(n < 4 && uspesnoKrenulo && slobodan(x,y) && trTabla[n][0] == -1){
        trTabla[n][0] = x;
        trTabla[n][1] = y;
        n++;
        elem.style.background = "green";
    }
}

function resetuj(){
    let i = 0;
    while(i < n)
        {
            //alert("t_" + String.fromCharCode(trTabla[i][0] - 1 +'a'.charCodeAt(0))+ "_" + trTabla[i][1].toString());
            let s = "t_" + String.fromCharCode(trTabla[i][0] +'a'.charCodeAt(0))+ "_" + trTabla[i][1].toString();
            document.getElementById(s).style.background = "lightblue";
            i++;
        }
}

function resetujAkoJeKraj(){
    if(br1 == 0 && br2 == 0 && br3 == 0 && br4 == 0){
        // sacuvati tablu kao kolacic 1
        
        var s = "";
        for(let i = 0; i < 10; i++){
            for(let j = 0; j < 10; j++) {
                if(tabla[i][j] != 1) {
                    s = s.concat('0');
                }
                else {
                    s = s.concat('1');
                }
                document.getElementById("t_" + String.fromCharCode(i +'a'.charCodeAt(0))+ "_" + j.toString()).style.background = "lightblue";
            }
        }
        tabla = [];
        pocetak();
        if(user1){
            document.cookie = "tabla1=" + s;
            user1 = false;
        }
        else{
            document.cookie = "tabla2=" + s;
            window.open("battleship-game.html", "_self");
            }
    }
}

function mozeLi(){
    if(n == 1 && br1 > 0) {br1--; return true;}
    if(n == 2 && br2 > 0) {br2--; return true;}
    if(n == 3 && br3 > 0) {br3--; return true;}
    if(n == 4 && br4 > 0) {br4--; return true;}
    resetuj();
    return false;
}

function postavi(){
    let i = 0;
    if(mozeLi())
    while(i < n && trTabla[i][0] != -1 && trTabla[i][1] != -1){
        let x = trTabla[i][0];   //elem.id[2].charCodeAt(0) - 'a'.charCodeAt(0);
        let y = Number(trTabla[i][1]);    //elem.id[4];
        i = i + 1;
        
            tabla[x][y] = 1;

            if(x > 0 && nijeU(x -1, y)){
                tabla[x-1][y] = 2;
                document.getElementById("t_" + String.fromCharCode(x - 1 +'a'.charCodeAt(0))+ "_" + y.toString()).style.background = "orange";
            }
            if(x < 9 && nijeU(x+1, y)){
                tabla[x+1][y] = 2;
                document.getElementById("t_" + String.fromCharCode(x + 1 +'a'.charCodeAt(0))+ "_" + y.toString()).style.background = "orange";
            }
            if(y > 0 && nijeU(x, y-1)){
                tabla[x][y-1] = 2;
                document.getElementById("t_" + String.fromCharCode(x +'a'.charCodeAt(0))+ "_" + (y-1).toString()).style.background = "orange";
            }
            if(y < 9 && nijeU(x, y+1)){
                tabla[x][y+1] = 2;
                document.getElementById("t_" + String.fromCharCode(x +'a'.charCodeAt(0))+ "_" + (y+1).toString()).style.background = "orange";
            }
    }
    
    resetujAkoJeKraj();

    document.getElementById("br1").textContent  = br1.toString();
    document.getElementById("br2").textContent  = br2.toString();
    document.getElementById("br3").textContent  = br3.toString();
    document.getElementById("br4").textContent  = br4.toString();
    uspesnoKrenulo = false;
    n = 0;
    trTabla = [[-1, -1], [-1, -1], [-1, -1], [-1, -1]];

}

