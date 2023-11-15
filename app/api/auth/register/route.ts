import { connectToDatabase } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import bcrypt from 'bcrypt'
import { NextResponse } from "next/server";
export const POST=async (req:Request)=>{
    try{
        const {name,email,password}=await req.json();
        if(!name || !email || !password)
        return NextResponse.json({message:"Invalid Data"},{status:422})
        const hashedPassword=await bcrypt.hash(password,10)
        await connectToDatabase();
        const newUser=await prisma.user.create({
            data:{email,name,hashedPassword}
        })
        return NextResponse.json(newUser)
    }catch(err){
        return NextResponse.json("Server Error")
    }finally{
        await prisma.$disconnect();
    }
}