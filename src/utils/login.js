const USERID = 1;

export default USERID

export function esCreador (idProyecto){
  if(USERID == idProyecto){
    return true;
  }
}

export function esUsuarioRegistrado (id){
  return id == USERID
}