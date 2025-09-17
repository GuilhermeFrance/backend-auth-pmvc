import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LoginValidationMiddleware } from './middlewares/login-validation.middleware';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [UserModule,
            PassportModule,
            JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '30d'}
  })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule]
})

export class AuthModule implements NestModule{
  configure(consumer: MiddlewareConsumer){
    consumer.apply(LoginValidationMiddleware).forRoutes('login');
  }
}

