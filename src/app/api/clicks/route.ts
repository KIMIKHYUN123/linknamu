import { connection } from "next/server";
import { profile } from "@/data/profile";
import { getClicksCollection } from "@/lib/mongodb";

// GET /api/clicks → 모든 링크의 현재 클릭 수를 한 번에 반환
// 예: { "counts": { "github": 42, "instagram": 7, "email": 0 } }
export async function GET() {
  await connection(); // 빌드 때 미리 만들지 않고 매 요청마다 DB에서 읽는다

  try {
    const ids = profile.links.map((link) => link.id);
    const collection = await getClicksCollection();
    const docs = await collection.find({ _id: { $in: ids } }).toArray();

    const counts: Record<string, number> = Object.fromEntries(ids.map((id) => [id, 0]));
    for (const doc of docs) counts[doc._id] = doc.count;

    return Response.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[GET /api/clicks]", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}
