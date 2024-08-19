import { Request, Response } from 'express';
import { PessoaService } from '../service/PessoaService';
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from 'tsoa';
import { PessoaRequestDto } from '../model/dto/PessoaRequesDto';
import { BasicResponseDto } from '../model/dto/BasicResponseDto';
import { Pessoa } from '../model/entity/Pessoa';
import { PessoaDto } from '../model/dto/PessoaDto';


@Route("pessoa")
@Tags("Pessoa")
export class PessoaController extends Controller {
    pessoaService = new PessoaService();

    @Post()
    async cadastrarProduto(
        @Body() dto: PessoaRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.cadastrarPessoa(dto);
            return success(201, new BasicResponseDto("Pessoa cadastrada com sucesso!", pessoa));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    
    @Put()
    async atualizaPessoa(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.atualizaPessoa(dto);
            return success(200, new BasicResponseDto("Produto atualizado com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete()
    async deletarProduto(
        @Body() dto: PessoaDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoa = await this.pessoaService.deletaPessoa(dto);
            return success(200, new BasicResponseDto("Produto deletado com sucesso!", pessoa));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarPessoa(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas: Pessoa[] = await this.pessoaService.listarPessoa();
            return success(200, new BasicResponseDto("Pessoas listadas com sucesso!", pessoas));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("id/{id}")
    async buscarPessoaPorId(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const product = await this.pessoaService.buscarPessoaID(id);
            return success(200, new BasicResponseDto("Produto encontrado!", product));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    async buscarPessoaPorEmail(
        @Query() email: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const pessoas: Pessoa[] = await this.pessoaService.buscarPessoaEmail(email);
            return success(200, new BasicResponseDto("Produto encontrado!", pessoas));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}