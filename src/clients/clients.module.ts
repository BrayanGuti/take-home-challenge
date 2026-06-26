import { Module } from '@nestjs/common';
import { CLientsProviders } from './providers';

@Module({
  providers: [...CLientsProviders],
  exports: [...CLientsProviders],
})
export class ClientsModule {}
