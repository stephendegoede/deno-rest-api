import { Product } from "../types.ts";

let products: Product[] = [
  { id: "1", name: "Product One", description: "Product 1", price: 29.99 },
];

// @desc  Get all products
// @route GET /api/v1/products
const getProducts = ({ response }: { response: any }) => {
  response.body = {
    success: true,
    data: products,
  };
};

// @desc  Get single products
// @route GET /api/v1/products/:id
const getProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  const product: Product | undefined = products.find(
    (p) => p.id === params.id,
  );

  if (product) {
    response.status = 200;
    response.body = { success: true, data: product };
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found" };
  }
};

// @desc  Add a product
// @route POST /api/v1/products
const addProduct = async (
  { request, response }: { request: any; response: any },
) => {
  try {
    const body = await request.body();

    const product: Product = await body.value;

    product.id = self.crypto.randomUUID();
    products.push(product);
    response.status = 201;
    response.body = {
      success: true,
      data: product,
    };
  } catch (error) {
    console.log(error);
    response.status = 400;
    response.body = { success: false, message: "Incorrect data." };
  }
};

// @desc  Update a product
// @route PUT /api/v1/products/:id
const updateProduct = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let product: Product | undefined = products.find(
    (p) => p.id === params.id,
  );
  if (product) {
    try {
      const body = await request.body();
      const updateData: {
        name?: string;
        description?: string;
        price?: number;
      } = await body.value;

      product = { ...product, ...updateData };

      response.status = 200;
      response.body = { success: true, data: product };
    } catch (error) {
      console.log(error);
      response.status = 400;
      response.body = { success: false, message: "Incorrect data." };
    }
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found." };
  }
};

// @desc  Update a product
// @route DELETE /api/v1/products/:id
const deleteProduct = (
  { params, response }: { params: { id: string }; response: any },
) => {
  let product: Product | undefined = products.find(
    (p) => p.id === params.id,
  );
  if (product) {
    products = products.filter((p) => p.id !== params.id);
    response.status = 200;
    response.body = { success: true, data: products };
  } else {
    response.status = 404;
    response.body = { success: false, message: "No product found." };
  }
};

export { addProduct, deleteProduct, getProduct, getProducts, updateProduct };
