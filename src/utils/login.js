let USERID = null;

export default USERID

export function esCreador (idProyecto){
  return USERID == idProyecto;
}

export function esUsuarioRegistrado (id){
  return id == USERID
}

export function registrar (){
  USERID = 1
}