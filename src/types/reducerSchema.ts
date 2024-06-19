import { CartStateSchema } from "./cartReducerSchemas"
import { FilterStateSchema } from "./filterReducerSchemas"
import { FooterEmailStateSchema } from "./footerReducerSchemas"

export type RootState = {
  filters: FilterStateSchema
  shoppingCart: CartStateSchema
  footerEmail: FooterEmailStateSchema
}
