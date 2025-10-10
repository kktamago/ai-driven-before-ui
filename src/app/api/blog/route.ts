import { NextResponse } from "next/server";
import { PrismaClient } from "../../../generated/prisma";
import { data } from "react-router-dom";

const prisma = new PrismaClient();

export async function main() {
    try {
        await prisma.$connect();
    } catch (e) {
        return Error("DB接続に失敗しました");
    }
}

// GETブログの全記事取得
export const GET = async (req: Request, res:NextResponse) => {
    try {
        await main();
        const posts = await prisma.post.findMany({ orderBy: { date: "asc" } });
        return NextResponse.json({ message: "Success", posts },{ status: 200 });
        } catch(err){
            return NextResponse.json({ message: "Error", err },{ status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    };

// POSTブログの新規記事作成
export const POST = async (req: Request, res: NextResponse) => {
    console.log("POST");

    try {
        const { title, description } = await req.json();
        await main();
        const post = await prisma.post.create({ data: { title, description } });
        return NextResponse.json({ message: "Success", post },{ status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", err },{ status: 500 });
    }   finally {
        await prisma.$disconnect();
    }
};