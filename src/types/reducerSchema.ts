import { CartReducerFunctionSchema } from "./cartReducerSchemas"
import { FilterReducerFunctionSchema,  } from "./filterReducerSchemas"

export type RootState = {
  filters?: FilterReducerFunctionSchema
  shoppingCart?: CartReducerFunctionSchema
}
