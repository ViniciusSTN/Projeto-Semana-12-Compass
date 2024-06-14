import { CartStateSchema } from "./cartReducerSchemas";
import { FilterStateSchema } from "./filterReducerSchemas";

export type RootState = {
  filters: FilterStateSchema
  shoppingCart: CartStateSchema
}
