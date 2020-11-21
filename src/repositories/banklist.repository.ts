import * as AWS from 'aws-sdk';
import { CreateBankDto } from '../modules/bank/createBank.dto';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import DynamoDB, { DocumentClient } from 'aws-sdk/clients/dynamodb';

export class BankRepository {
    constructor() {
    }

AwsConnection()
{
    AWS.config.update(
        {region: 'us-east-1'
    });
}
    async createBank(createBankDto: CreateBankDto) {
        const newBank = {
            id: uuid(),
            name: createBankDto.name,
            compe: createBankDto.compe,
        };

        try {
            this.AwsConnection();
            await new AWS.DynamoDB.DocumentClient()
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
            this.AwsConnection();
            const result = await new AWS.DynamoDB.DocumentClient()
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
        try {
            this.AwsConnection();
            const result = await new AWS.DynamoDB.DocumentClient()
                .delete({
                    TableName: "Banklist",
                    Key: { id },
                })
                .promise();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return { ok: true };
    }
}