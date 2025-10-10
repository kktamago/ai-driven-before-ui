import { NextResponse } from "next/server";
import { PrismaClient } from "../../../../generated/prisma";

import { main } from "../route";

const prisma = new PrismaClient();

// GETブログの記事のひとつを取得
export const GET = async (req: Request, res:NextResponse) => {
    try {
        const id:number = parseInt(req.url.split("/blog/")[1]);
        await main();

        const post = await prisma.post.findFirst({ where: { id } });

        if (!post) {
            return NextResponse.json({ message: "Not Found" },{ status: 404 });
        }

        return NextResponse.json({ message: "Success", post },{ status: 200 });
        } catch(err){
            return NextResponse.json({ message: "Error", err },{ status: 500 });
        } finally {
            await prisma.$disconnect();
        }
    };

// PuTブログの記事の更新
export const PUT = async (req: Request, res: NextResponse) => {
    console.log("POST");

    try {
        const id:number = parseInt(req.url.split("/blog/")[1]);
        const { title, description } = await req.json();

        await main();

        const post = await prisma.post.update({ data: { title, description }, where: { id } });

        return NextResponse.json({ message: "Success", post },{ status: 200});
    } catch (err) {
        return NextResponse.json({ message: "Error", err },{ status: 500 });
    }   finally {
        await prisma.$disconnect();
    }
};

// DELETEブログの記事の削除
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        const id:number = parseInt(req.url.split("/blog/")[1]);
  
        await main();
  
        const post = await prisma.post.delete({ where: { id } });
  
        return NextResponse.json({ message: "Success", post },{ status: 200 });
  
  } catch (err) {
        return NextResponse.json({ message: "Error", err },{ status: 500 });
    }   finally {
        await prisma.$disconnect();
    }
};