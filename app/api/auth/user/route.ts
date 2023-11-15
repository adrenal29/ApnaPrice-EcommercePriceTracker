import { connectToDatabase } from "@/helpers/server-helpers"
import prisma from "@/prisma";
import { NextResponse } from "next/server";

export const GET=async()=>{
    try{
        await connectToDatabase();
        const users=await prisma.user.findMany();
        return NextResponse.json({users});
    }catch(err){
        return NextResponse.json({error:"server error"});
    }finally{
        await prisma.$disconnect();
    }
}