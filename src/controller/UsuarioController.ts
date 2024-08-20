import { Request, Response } from 'express';
import { UsuarioService } from '../service/UsuarioService';
import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { UsuarioRequestDto } from '../model/dto/UsuarioRequestDto';
import { BasicResponseDto } from '../model/dto/BasicResponseDto';
import { Usuario } from '../model/entity/Usuario';
import { UsuarioDto } from '../model/dto/UsuarioDto';


@Route("usuario")
@Tags("Usuario")
export class ProductController extends Controller {
    usuarioService = new UsuarioService();

    @Post()
    async cadastrarProduto(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.cadastrarUsuario(dto);
            return success(201, new BasicResponseDto("Usuario cadastrado com sucesso!", usuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    
    @Put()
    async atualizaUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.atualizaUsuario(dto);
            return success(200, new BasicResponseDto("Produto atualizado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletaUsuario(
        @Body() dto: UsuarioDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.deletaUsuario(dto);
            return success(200, new BasicResponseDto("Produto deletado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
    
    @Get("all")
    async listarUsuario(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios: Usuario[] = await this.usuarioService.listarUsuario();
            return success(200, new BasicResponseDto("Usuarios listados com sucesso!", usuarios));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async buscarUsuarioPorID(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.buscarUsuarioID(id);
            return success(200, new BasicResponseDto("Usuario encontrado!", usuario));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}