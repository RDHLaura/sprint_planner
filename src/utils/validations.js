export function validEmail(value){
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ?
     '' : 'Invalid Email Address';
}

export function  validPassword(value){
  return (/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[\W_]+).{7,})\S$/.test(value))?
    '' : "Contraseña inválida (Debe tener un mínimo de 8 caracteres, al menos una mayuscula, una minuscula, un número, un caracter especial y no debe contener espacios.)";
}

export const validPasswordCheck = (pw, pw_check)=>{
  return (pw !== pw_check) ? "La contraseña no coincide." : "";
}


export function validName (value){
  let difference = 6 - value.length;
  return (value.length<6) ? 'Debe tener al menos 6 caracteres! '+ difference + ' caracteres restantes' : '';
}

export function validDescription (value){
  let difference = 12 - value.length;
  return (value.length<12) ? 'Debe tener al menos 12 caracteres! '+ difference + ' caracteres restantes' : ""
}


export const validDate = (date)=>{
  const regEx = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/

  if(!regEx.test(date))
    return "Formato de fecha inválido"

  //Validación de cada parte de la fecha
  const secciones = date.split('-').map((seccion)=> parseInt(seccion, 10));
  secciones[1] -=1;

  const f = new Date(secciones[0], secciones[1], secciones[2]);

  if(f.getFullYear() !== secciones[0] || f.getMonth() !==secciones[1] || f.getDate() !== secciones[2]){
    return "Formato de fecha inválido";
  }

  const actual = new Date();
  if(f < actual)
    return "La fecha debe ser posterior a la actual"
}



export function isEmpty(value){
    return (value.length===0) ? 'Campo requerido' : '';
}