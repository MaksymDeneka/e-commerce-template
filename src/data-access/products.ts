import { database } from "@/db";
import products, { NewProduct } from "@/db/schema/products";


export async function createProduct(product: NewProduct) {
	await database.insert(products).values(product);
}