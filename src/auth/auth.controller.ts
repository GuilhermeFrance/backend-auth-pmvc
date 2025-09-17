import { Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { AuthRequest } from './models/AuthRequest';
import { isPublic } from './decorators/is-public.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService){}

@isPublic()
@Post('login')
@HttpCode(HttpStatus.OK)
@UseGuards(LocalAuthGuard)
login(@Request() req) {
    console.log(req.user)
   
    return this. authService.login(req.user);
    
}}