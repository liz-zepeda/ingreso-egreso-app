export class UsuarioModel {

    static fromFirebase( { correo, uid, nombre}: any ) { // el mismo nombre de las propiedades en mi firebase

        return new UsuarioModel(uid, nombre, correo);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public correo: string,
    ) { }

}