import { NextResponse } from 'next/server';

// Supabase REST APIのURLとAPIキー（.envで管理推奨）
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_API_KEY = process.env.SUPABASE_API_KEY;

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    // Clerkのユーザー作成イベントから必要な情報を抽出
    const { id, email_addresses, first_name, last_name } = body.data;
    const email = email_addresses?.[0]?.email_address || '';

    // Supabaseのユーザーテーブルに追加
    const res = await fetch(`${SUPABASE_URL}/rest/v1/users`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_API_KEY!,
        'Authorization': `Bearer ${SUPABASE_API_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({
        clerk_id: id,
        email,
        first_name,
        last_name,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ message: 'Supabase Error', error }, { status: 500 });
    }
    const result = await res.json();
    return NextResponse.json({ message: 'Success', result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: 'Error', err }, { status: 500 });
  }
};
