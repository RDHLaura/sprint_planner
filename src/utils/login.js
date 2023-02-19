const USERID = 1;

export default USERID

export function esCreador (idProyecto){
  return USERID == idProyecto;
}

export function esUsuarioRegistrado (id){
  return id == USERID
}