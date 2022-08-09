import { Usuario } from "./Usuario";

export class UsuariosLista {
private lista: Usuario[] = [];

constructor() {}

public agregar (usuario: Usuario){

    this.lista.push(usuario);
    console.log(this.lista);
    return usuario;
}

    public actualizarNombre (id: string, nombre: string){
        for(let usuario of this.lista){

            if(usuario.id === id){
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('==== Actualizando usuario ====');
        console.log(this.lista);

    }
   //Obtener listacod
    public getLista(){
        return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre');

    }
     //

    public getUsuario(id: string){
        return this.lista.find( Usuario => Usuario.id === id);
   
    }
 //

    public getUsuariosEnSala( sala: string){
        return this.lista.filter(Usuario => Usuario.sala === sala);
   
    }

    //borrar usuario
    public borrarUsuario(id: string)
    {

        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario =>  usuario.id !== id)
        // console.log(this.lista);
        return tempUsuario;
        
    }

}