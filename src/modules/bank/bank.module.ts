
import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { BankRepository } from '../../repositories/banklist.repository';

@Module({
  imports: [],
  controllers: [BankController],
  providers: [BankService, BankRepository],
})
export class BankModule {}
