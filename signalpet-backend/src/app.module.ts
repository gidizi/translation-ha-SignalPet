import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FindingsModule } from './findings/findings.module';
import { TranslationService } from './translation/translation.service';
import { TranslationModule } from './translation/translation.module';

@Module({
  imports: [FindingsModule, TranslationModule],
  controllers: [AppController],
  providers: [AppService, TranslationService],
})
export class AppModule {}
