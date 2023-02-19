let USERID = 1;

export function getUserID (){
  return USERID
}

export function esCreador (idProyecto){
  return USERID == idProyecto;
}

export function esUsuarioRegistrado (id){
  return id == USERID
}

