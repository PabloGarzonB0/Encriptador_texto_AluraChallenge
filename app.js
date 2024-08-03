/*
-----------------------------------
Programa: Encriptador de texto
Autor: Pablo Cesar Garzon Benitez
Fecha: Agosto 2024
-----------------------------------
INSTRUCCIONES INICIALES:

- Las "Llaves" de encriptacion que utilizaremos son las siguientes
la palabra "e" ->  se convertira en "enter"
la palabra "i" ->  se convertira en "imes"
la palabra "a" ->  se convertira en "ai"
la palabra "o" ->  se convertira en "ober"
la palabra "u" ->  se convertira en "ufat"

- Requisitos:
+ Debe funcionar con letras minusculas
+ No debe utilizar letras con acento ni caracteres especiales
+ Debe tenerse un codificador y decodificador de texto.
+ Un boton que copie el texto encriptado/desencriptado para la seccion de transferencia como 'ctrl+C'
+ 
*/
//Seleccion de elementos con domn
const btnEncriptar = document.querySelector("#codifica");
const btnDesencriptar = document.querySelector("#decodifica");
const textEncriptar = document.querySelector(".encriptar");
const aviso = document.querySelector(".texto_aviso");
const respuesta = document.querySelector(".evaluar");
const btnCopiar = document.querySelector(".btn_copiar");
const btnBorrar= document.querySelector("#limpiar");

//Inicializacion de variables
var codi = ["e","i","a","o","u"];
var deco = ["enter","imes","ai","ober","ufat"];
var flag = true;
//----------------------Boton encriptar-----------------------------------
btnEncriptar.addEventListener("click", e=>{
    e.preventDefault();
    let texto = textEncriptar.value;
    var txt = texto.normalize("NFD").replace(/[$\.¿\?]~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g,"");

    if(texto== ""){
        advertencia("El campo de texto no debe estar vacio","#EE0B34")
    }
    else if(texto !== txt){
        advertencia("No debe tener acentos y caracteres especiales","#14962c")
    }
    else if(texto !== texto.toLowerCase()){
        advertencia("El texto debe ser todo en minuscula","#db690b")
    }

    else{
        let mensajeCod=EncriptadorMensaje(codi,deco,txt);
        document.querySelector(".texto_1").innerHTML = "El texto fue encriptado correctamente";
        document.querySelector(".texto_2").innerHTML = "&#128205; Ya tienes un mensaje codificado";
        respuesta.innerHTML = mensajeCod;
        btnCopiar.style.visibility = "inherit";
    }
});

//----------Boton desencriptar-----------------------------------------------
btnDesencriptar.addEventListener("click", e=>{
    e.preventDefault();
    let texto = textEncriptar.value;
    var txt = texto.normalize("NFD").replace(/[$\.¿\?]~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g,"");

    if(texto== ""){
        advertencia("El campo de texto no debe estar vacio","#EE0B34")
    }
    else if(texto !== txt){
        advertencia("No debe tener acentos y caracteres especiales","#14962c")
    }
    else if(texto !== texto.toLowerCase()){
        advertencia("El texto debe ser todo en minuscula","#db690b")
    }
    else{
        let mensajeDec=DesencriptadorMensaje(txt);
        document.querySelector(".texto_1").innerHTML = "El texto fue desencriptado correctamente";
        document.querySelector(".texto_2").innerHTML = "&#128214; Este era es secreto guardado";
        respuesta.innerHTML = mensajeDec;
        btnCopiar.style.visibility = "inherit";

    }
});
//----------------------Boton Borrar-----------------------------------
btnBorrar.addEventListener("click", e => {
    e.preventDefault();
    textEncriptar.value = ''; // Limpiar el textarea
    respuesta.innerHTML = ''; // Limpiar el área de respuesta
});
//------------- boton de copiar----------------------------------
btnCopiar.addEventListener("click", e=>{
    e.preventDefault();
    let copiar = respuesta;
    copiar.select();
    document.execCommand("copy");
    btnCopiar.style.visibility = "hidden"; // Ocultar el botón copiar
});

//------------------Funciones core---------------------------------------------
function EncriptadorMensaje(entrada,salida,mensaje){
     // Se recorre el string para agregar a la nueva cadena de texto
     let nuevoTexto = "";
         for (let letra of mensaje) {
             switch (letra) {
                 case entrada[0]:
                     nuevoTexto += salida[0];
                     break;
                 case entrada[1]:
                     nuevoTexto += salida[1];
                     break;
                 case entrada[2]:
                     nuevoTexto += salida[2];
                     break;
                 case entrada[3]:
                     nuevoTexto += salida[3];
                     break;
                 case entrada[4]:
                     nuevoTexto += salida[4];
                     break;
                 default:
                     nuevoTexto += letra;
                     break;
             }
         }  
         
    return nuevoTexto;   
}

function DesencriptadorMensaje(mensaje){
    let textoOriginal=mensaje;
    textoOriginal = textoOriginal.replace(/enter/g, 'e');
    textoOriginal = textoOriginal.replace(/imes/g, 'i');
    textoOriginal = textoOriginal.replace(/ufat/g, 'u');
    textoOriginal = textoOriginal.replace(/ai/g, 'a');
    textoOriginal = textoOriginal.replace(/ober/g, 'o');
    return textoOriginal;
}

//-----------------funcion para recordar las reglas de escritura-----------------
function advertencia(adv,color_texto){
    aviso.style.color = color_texto;
    aviso.style.fontWeight = "600";
    aviso.textContent = adv;
    // Transicion de estilo por 1.5 seg
    setTimeout(()=>{
        aviso.removeAttribute("style");
    },1500);
}