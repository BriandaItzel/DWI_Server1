import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/Usuarios-Lista';
import { Usuario } from "../classes/Usuario";

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket, io: socketIO.Server ) => {
    const usuario = new Usuario (cliente.id);
    usuariosConectados.agregar(usuario);


}

export const desconectar = ( cliente: Socket, io: socketIO.Server) =>{ 
    cliente.on('disconnect', ()=>
    {
        console.log('Cliente Desconectado');
        usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', usuariosConectados.getLista() );
    })
}
export const mensaje = (cliente:Socket, io: socketIO.Server)=>{
    cliente.on('mensaje', (payload:{de: string, cuerpo:string}) => {
       
        console.log('Mensaje recibido',payload);

        io.emit('mensaje-nuevo', payload);

    })
}

export const configurarUsuario = (cliente:Socket, io: socketIO.Server)=>{
    cliente.on('configurar-usuario', (payload:{nombre: string}, callback: Function) => {
       
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos',usuariosConectados.getLista() );


        callback({
            ok: true,
            mensaje: `usuario ${ payload.nombre} configurado.`

        });

       

    });
}

//obtener usuarios
export const ObtenerUsuarios = (cliente:Socket, io: socketIO.Server)=>{
    cliente.on('Obtener-usuarios', () => {
       
        io.to( cliente.id ).emit('usuarios-activos',usuariosConectados.getLista() );


        

       

    });
}