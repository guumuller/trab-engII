import express from 'express';
import { ProdutoRepository } from './repository/ProdutoRepository';
import { ProdutoService } from './service/ProdutoService';
import { ProdutoController } from './controller/ProdutoController';
import { produtoRotas } from './routes/ProdutoRouter';
import { AppDataSource } from './data-source';
import { Produto } from './model/Produto';
import { Pedido } from './model/Pedido';
import { PedidoService } from './service/PedidoService';
import { PedidoController } from './controller/PedidoController';
import { pedidoRotas } from './routes/PedidoRouter';
import { Usuario } from './model/Usuario';
import { UsuarioService } from './service/UsuarioService';
import { UsuarioController } from './controller/UsuarioController';
import { usuarioRotas } from './routes/UsuarioRouter';
import { LoginService } from './service/LoginService';
import { LoginController } from './controller/LoginController';
import { TokenMiddleware } from './middleware/TokenMiddleware';

AppDataSource.initialize().then(async => {
  const app = express();
  app.use(express.json());

  // Initialize dependencies 
  //Produto
  const produtoRepository = AppDataSource.getRepository(Produto);
  const produtoService = new ProdutoService(produtoRepository);
  const produtoController = new ProdutoController(produtoService);

  //Pedido
  const pedidoRepository = AppDataSource.getRepository(Pedido);
  const pedidoService = new PedidoService(pedidoRepository);
  const pedidoController = new PedidoController(pedidoService);

  //Usuario
  const usuarioRepository = AppDataSource.getRepository(Usuario);
  const usuarioService = new UsuarioService(usuarioRepository);
  const usuarioController = new UsuarioController(usuarioService);

  //Login
  const loginService = new LoginService(usuarioRepository);
  const loginController = new LoginController(loginService);

  //Midleware TokenMiddleware
  const tokenMiddleware = new TokenMiddleware(loginService)

  // Routes
  app.post('/api/login', loginController.realizarLogin);
  app.use('/api/usuarios', usuarioRotas(usuarioController));

  app.use(tokenMiddleware.verificarAcesso.bind(tokenMiddleware));
  app.use('/api/produtos', produtoRotas(produtoController));
  app.use('/api/pedidos', pedidoRotas(pedidoController));


  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});