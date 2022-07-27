import { Router, Request, Response, response } from "express";
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/sockets';
import { Socket } from 'socket.io';
export const router = Router();

const sockets:any = null;


router.get('/mensajes', (req: Request, res: Response) =>
{

   
   
   res.json(
 {
    ok:true,
    mensaje: 'Todo esta bien'
 });
});

router.post('/mensajes', (req:Request, res:Response) =>
{
   const cuerpo = req.body.cuerpo;
   const de = req.body.de;

   const payload = { cuerpo, de};

   const server = Server.instance;
   server.io.emit('mensaje-nuevo', payload);
   

   res.json({
      ok:true,
      cuerpo,
      de
  
   });

});

router.post('/mensajes/:para', (req:Request, res:Response) =>
{
   const cuerpo = req.body.cuerpo;
   const de = req.body.de;
   const para = req.params.para;
   
   const payload = {
      de,
      cuerpo
   }
   
   const server = Server.instance; 
   server.io.in(para).emit('mensaje-privado', payload);

   res.json({
      ok:true,
      cuerpo,
      de, 
      para
     
   });

});

// servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', (req: Request, res: Response)=>

{
   
   const server = Server.instance;
   server.io.fetchSockets().then((sockets) =>  {
      const clients: Object[] = [];
      sockets.forEach(socket => clients.push(socket.id));
      res.json({ ok:true, clients,});}).catch(error =>
         res.json({ ok:true, error,}));
      
      });


router.get('/usuarios/detalle', (req: Request, res: Response)=>{
  
   res.json({
      ok: true,
     clientes: usuariosConectados.getLista()
   })
   

});


  

export default router;