"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import user from "../models/user.model";
import prisma from "@/prisma";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";
import { useSession } from "next-auth/react";

export async function scrapeAndStoreProduct(productUrl: string) {
  if (!productUrl) return;

  try {
    await connectToDB();

    const scrapedProduct = await scrapeAmazonProduct(productUrl);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct = await Product.findOne({ url: scrapedProduct.url });

    if (existingProduct) {
      const updatedPriceHistory: any = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice }
      ]

      product = {
        ...scrapedProduct,
        priceHistory: updatedPriceHistory,
        lowestPrice: getLowestPrice(updatedPriceHistory),
        highestPrice: getHighestPrice(updatedPriceHistory),
        averagePrice: getAveragePrice(updatedPriceHistory),
      }
    }

    const newProduct = await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct._id}`);
  } catch (error: any) {
    throw new Error(`Failed to create/update product: ${error.message}`)
  }
}

export async function getProductById(productId: string) {
  try {
    await connectToDB();

    const product = await Product.findOne({ _id: productId });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllProducts(searchQuery: any) {
  try {
    await connectToDB();
    console.log(searchQuery)
    const query = searchQuery != "all"
      ? {
        $or: [
          { title: { $regex: searchQuery, $options: 'i' } },
          // Add more fields to search if needed
        ],
      }
      : {};
    const products = await Product.find(query).limit(10);

    return products;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching products');
  }
}

export async function getSimilarProducts(productId: string) {
  try {
    await connectToDB();

    const currentProduct = await Product.findById(productId);

    if (!currentProduct) return null;

    const similarProducts = await Product.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error) {
    console.log(error);
  }
}

export async function addItem(item: any) {
  try {
    await connectToDB();
    console.log(item);
  } catch (error) {
    console.log(error)
  }
}

export async function addUserWhatsappToProduct(productId: string, userEmail: string) {
  try {
    await connectToDB();
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some((user: User) => user.email === userEmail);

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();
    }
    const data = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });
    data?.wishlist?.push(productId);

    // Update the user data with the modified wishlist
    const updatedUser = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        wishlist: data?.wishlist,
      },
    });

    console.log('Product added to wishlist:', updatedUser);



  } catch (error) {
    console.log(error);
  }
}

export async function getUserProducts(userEmail: string) {
  try{
    await  connectToDB();
    const user = await prisma.user.findUnique({
    where: {
      email: userEmail,
    },
  });
  console.log(user)
  if (!user) {
    console.log('User not found');
    return null;
  }
  const products:any=[];
  const l=user?.wishlist
  for(let el of l){
    console.log(el)
    const data=await Product.findById(el);
    products.push(data);
  }
  
  console.log(products)
  return products;
} catch (error) {
  console.error('Error fetching user:', error);
  throw error;
} 
}

