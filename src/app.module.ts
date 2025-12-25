import { Module } from '@nestjs/common';
<<<<<<< HEAD

@Module({
  imports: [],
=======
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
>>>>>>> 06862b22a538c3fdd3f96f820998df9121345a9a
})
export class AppModule {}
