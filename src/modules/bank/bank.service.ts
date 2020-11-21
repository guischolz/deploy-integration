import { Injectable } from '@nestjs/common';
import { CreateBankDto } from './createBank.dto';
import { BankRepository } from '../../repositories/banklist.repository';

@Injectable()
export class BankService {
    constructor(private bankRepository: BankRepository) {}

    async createBank(createBankDto: CreateBankDto) {
        const createdBank = await this.bankRepository.createBank(createBankDto);
        return createdBank;
    }

    async getBankById(id) {
        const bank = await this.bankRepository.getBankById(id);
        return bank;
    }

    async deleteBankById(id) {
        const bank = await this.bankRepository.deleteBankById(id);
        return bank;
    }
}