import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    /* ================= LOGGER ================= */
    LoggerModule.forRoot({
      pinoHttp: {
        level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

        autoLogging: true,

        base: undefined, // bỏ pid, hostname cho gọn log

        transport:
          process.env.NODE_ENV !== 'production'
            ? {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  translateTime: 'HH:MM:ss',
                  ignore: 'pid,hostname',
                },
              }
            : undefined,
      },
    }),

    /* ================= CONFIG ================= */
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      // ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),

    /* ================= DATABASE ================= */
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URL');
        if (!uri) {
          throw new Error('MONGO_URL is not defined');
        }

        return {
          uri,
          autoIndex: process.env.NODE_ENV !== 'production',
          serverSelectionTimeoutMS: 5000,
        };
      },
    }),
  ],
})
export class AppModule {}
