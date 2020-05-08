function loadUsernames(){  
    let u1 = document.formWelcome.user1.value;
    let u2 = document.formWelcome.user2.value;
    
    if(check(u1, u2)){
        document.cookie = "username1=" + document.formWelcome.user1.value;
        document.cookie = "username2=" + document.formWelcome.user2.value;
        localStorage.setItem("username1", u1);
        localStorage.setItem("username2", u2);
        window.open("battleship-setup.html", "_self");
    }
    else {
        document.formWelcome.user1.value = "";
        document.formWelcome.user2.value = "";
        document.getElementById("warning").textContent = "Usernames are not in the good form";
    }
}

function check(uu1, uu2){
    let r = /\W/;
    let u1 = new String(uu1);
    let u2 = new String(uu2);

    if(r.test(u1) || r.test(u2) || u1.length < 3 || u2.length < 3 || u1.length > 12 || u2.length > 12)
        return false;
    return true;
}