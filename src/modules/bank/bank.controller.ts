import { Controller, Get, Post, Delete, Param,Body,Res,HttpStatus } from '@nestjs/common';
import { BankService } from './bank.service';
import { CreateBankDto } from './createBank.dto';

@Controller('banklist')
export class BankController {
  constructor(private readonly appService: BankService) {}


  @Get('compe/:id')
  async getByCompe(@Param('id') id:string, @Res() res: any) {
    const bank: any = await this.appService.getBankById(id);

    if (bank.ok) {
      return res.status(HttpStatus.OK).json({
          ok: true,
          order: bank.data,
      });
  } else {
      return res.status(HttpStatus.BAD_REQUEST).json({
          ok: false,
          message: 'Error Trying to Get Bank',
      });
  }
  }

  @Post()
  async create(@Body() createBankDto: CreateBankDto, @Res() res: any) {
       const newBank : any = await this.appService.createBank(createBankDto);
           
       if (newBank.ok) {
                return res.status(HttpStatus.CREATED).json({
                    ok: true,
                    data: newBank.data,
                });
            } else {
                return res.status(HttpStatus.BAD_REQUEST).json({
                    ok: false,
                    message: 'Error Trying to Create Bank',
                });
            } 
  }

  @Delete('compe/:id')
  async deleteBank(@Param('id') id:string, @Res() res: any) {
      const bank :any =  await this.appService.deleteBankById(id);
      if (bank.ok) {
      return res.status(HttpStatus.OK).json({
        ok: true
    });
    }
    else
    {
    return res.status(HttpStatus.BAD_REQUEST).json({
        ok: false,
        message: 'Error Trying to Delete Bank',
    });
    }
  }

}
