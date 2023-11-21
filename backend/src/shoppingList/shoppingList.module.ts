// import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
// import { ShoppingListService } from './shopping-list.service';

// @Controller('shopping-list')
// export class ShoppingListController {
//   constructor(private shoppingListService: ShoppingListService) {}

//   @Post('generate')
//   @HttpCode(HttpStatus.OK)
//   async generate(@Body('ingredients') ingredients: string[]): Promise<any> {
//     return await this.shoppingListService.generateShoppingList(ingredients);
//   }
// }
