export function validEmail(value){

  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ?
     '' : 'Invalid Email Address';
}

export function  validPassword(value){
  return (/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/.test(value))?
    '' : "Contraseña inválida (Debe tener un mínimo de 6 caracteres, al menos una mayuscula, una minuscula, un número y no debe contener espacios.)";
}

export function validNombreUsu (value){
  let difference = 6 - value.length;
  if (value.length<6) {
    return 'Must be 6 characters! '+ difference + ' characters left' ;
  } else {
    return '';
  }
}

export function isEmpty(value){
    return (value.length===0) ? 'Campo requerido' : '';
}