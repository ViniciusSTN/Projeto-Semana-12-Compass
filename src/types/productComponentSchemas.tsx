export type ProductSchema = {
  images: string[];
  discount_percentage: number;
  new: boolean;
  title: string;
  brief_description: string;
  finalPrice: number;
  price: number;
}

export type ProductComponentSchema = React.FC<ProductSchema>;
