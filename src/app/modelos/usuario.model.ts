export class Usuario {

    static fromFirebase( { correo, uid, nombre}: any ) { // el mismo nombre de las propiedades en mi firebase

        return new Usuario(uid, nombre, correo);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public correo: string,
    ) { }

}