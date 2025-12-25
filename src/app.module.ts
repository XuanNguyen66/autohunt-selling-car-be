import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({
  imports: [],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import 'dotenv'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/development.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'),


      }),
    })
  ],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 06862b22a538c3fdd3f96f820998df9121345a9a
})
export class AppModule { }
