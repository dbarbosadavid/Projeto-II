import { Request, Response } from 'express';
import { UsuarioService } from '../service/UsuarioService';

const usuarioService = new UsuarioService()

export function cadastrarUsuario(req: Request, res: Response) {
    try {
        const novoUsuario = usuarioService.cadastrarUsuario(req.body)
        res.status(200).json({
            message: "Usuario Cadastrado com Sucesso!!!",
            novaCategoria: novoUsuario
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function listarUsuario(req: Request, res: Response){
    try {
        const lista = usuarioService.listarUsuario()
        res.status(200).json({
            message: "Usuarios Cadastradss:",
            Usuários: lista
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}

export function buscarUsuarioID(req: Request, res: Response){
    try {
        const usuario = usuarioService.buscarUsuarioID(req.params)
        res.status(200).json({
            message: "Usuario Encontrado!!!",
            Usuario: usuario
        })
    } catch (error: any) {
        res.status(400).json({
            Erro: error.message
        })
    }
}