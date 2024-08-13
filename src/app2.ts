import express from "express";
import { buscarCategoriaID, cadastrarCategoria, listarCategoria } from "./controller/CategoriaController";
import { buscarLivroID, cadastrarLivro, listarLivro } from "./controller/LivroController";
import { buscarPessoaID, cadastrarPessoa, listarPessoa } from "./controller/PessoaController";
import { buscarUsuarioID, cadastrarUsuario, listarUsuario } from "./controller/UsuarioController";
import { buscarEmprestimoID, cadastrarEmprestimo, listarEmprestimo } from "./controller/EmprestimoController";

const app = express();
const PORT = process.env.PORT ?? 3000;
app.use(express.json());


function logInfo(){
    console.log(`API em execução no URL: http:localhost:${PORT}`);
}
app.post("/categoria", cadastrarCategoria);
app.post("/livro", cadastrarLivro);
app.post("/pessoa", cadastrarPessoa);
app.post("/usuario", cadastrarUsuario);
app.post("/emprestimo", cadastrarEmprestimo);

app.get("/categoria", listarCategoria);
app.get("/livro", listarLivro);
app.get("/pessoa", listarPessoa);
app.get("/usuario", listarUsuario);
app.get("/emprestimo", listarEmprestimo);

app.get("/categoria/:id", buscarCategoriaID);
app.get("/livro/:id", buscarLivroID);
app.get("/pessoa/:id", buscarPessoaID);
app.get("/usuario/:id", buscarUsuarioID);
app.get("/emprestimo/:id", buscarEmprestimoID);

app.listen(PORT, logInfo);


