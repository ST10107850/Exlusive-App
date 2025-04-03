import { Document, ObjectId } from "mongoose";
import Cart from "../models/cartModel";
import HttpError from "../utils/HttpError";
import { NOT_FOUND } from "../constants/http.codes";
import { CartItemWithId, itemsTypes } from "../types/cartTypes";
import { cartTypes } from "../types/cartTypes";

export const createCartService = async (
  userId: ObjectId,
  items: itemsTypes[]
): Promise<cartTypes> => {
  if (!userId) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: items.map(({ product, quantity }) => ({
        product,
        quantity,
      })),
    });
  } else {
    items.forEach(({ product, quantity }) => {
      if (!cart) return;

      const itemIndex = cart.items.findIndex(
        (item) => item.product.toString() === product.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity });
      }
    });
  }

  return await cart.save();
};

export const updateCartQuantityService = async (
  userId: string,
  id: string,
  quantity: number
) => {
  if (!userId) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  const itemIndex = cart.items.findIndex(
    (item) => ((item as unknown) as CartItemWithId)._id.toString() === id.toString()
  );
  if (itemIndex === -1) {
    throw new HttpError("Item not found in cart", NOT_FOUND);
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  return updatedCart;
};

export const deleteCartItemService = async (
  userId: ObjectId,
  itemId: string
) => {
  if (!userId) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  const itemIndex = cart.items.findIndex(
    (item) => 'id' in item && ((item as unknown) as CartItemWithId)._id.toString() === itemId.toString()
  );

  if (itemIndex === -1) {
    throw new HttpError("Item not found in cart", NOT_FOUND);
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  const updatedCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  return updatedCart;
};
