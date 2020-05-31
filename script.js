//$('.collapse').collapse()

ocultar()

function ocultar(evt) {
    document.getElementById("create").style.display = "none";
    document.getElementById("sign-log").style.display = "block";
}

function mostrar(evt) {
    document.getElementById("sign-log").style.display = "none";
    document.getElementById("create").style.display = "block";
}


function login_test(){
    console.log('entrou')
    var logo = document.getElementById("login").value;
    var pass = document.getElementById("password").value;

    console.log(logo + pass)
    console.log(logo + pass)

    if(logo == 'sandrobass@hotmail.com' && pass == 'admin'){
        console.log('Foi!!!!')
        window.location.href = "index.html";
    }else{
        console.log('não')
    }

}



