const USERID = 1;

export default USERID

export function esCreador (idProyecto){
  if(USERID == idProyecto){
    return true;
  }
}

export function esMiembro (asignado){
  asignado == USERID
}