import * as AWS from 'aws-sdk';
import { CreateBankDto } from '../modules/bank/createBank.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export class BankRepository {
    constructor() {}


    async createBank(createBankDto: CreateBankDto) {
        const newBank = {
            id: uuid(),
            name: createBankDto.name,
            compe: createBankDto.compe,
        };

        try {
            await new AWS.DynamoDB.DocumentClient(new AWS.DynamoDB({region: 'us-east-1'}))
                .put({
                    TableName: "Banklist",
                    Item: newBank,
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true, data: newBank };
    }

    async getBankById(id) {
        let bank;
        try {
            const result = await new AWS.DynamoDB.DocumentClient(new AWS.DynamoDB({region: 'us-east-1'}))
                .get({
                    TableName: "Banklist",
                    Key: { id },
                })
                .promise();

            bank = result.Item;
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!bank) {
            throw new NotFoundException(`Bank with ID "${id}" not found`);
        }

        return { ok: true, data: bank };
    }


    async deleteBankById(id) {
        let bank;
        try {
            const result = await new AWS.DynamoDB.DocumentClient(new AWS.DynamoDB({region: 'us-east-1'}))
                .delete({
                    TableName: "Banklist",
                    Key: { id },
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!bank) {
            throw new NotFoundException(`Bank with ID "${id}" not found`);
        }

        return { ok: true, data: bank };
    }
}