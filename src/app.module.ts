import { typeOrmConfig } from '@config/typeorm.config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImgService } from './common/services/img/img.service';
import { AuthModule, CardModule, CartModule, CategoryModule, DishModule, OrderModule, UserModule } from './modules';
import { CommentModule } from './modules/comment/comment.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig,
    }),

    AuthModule,
    UserModule,
    CardModule,
    OrderModule,
    CategoryModule,
    CartModule,
    DishModule,
    CommentModule
  ],
  controllers: [AppController],
  providers: [AppService, ImgService],
  exports: [AuthModule]
})
export class AppModule { }
