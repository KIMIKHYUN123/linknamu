import { MongoClient, type Collection } from "mongodb";

export type ClickDoc = {
  _id: string; // 링크 id (profile.ts의 links[].id)
  count: number;
};

// 개발 중 핫 리로드마다 새 연결이 생기지 않도록 전역에 한 번만 만들어 재사용한다.
const globalForMongo = globalThis as unknown as {
  _mongoClientPromise?: Promise<MongoClient>;
};

function getClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI 환경 변수가 설정되지 않았습니다. .env.local(또는 Vercel 환경 변수)을 확인하세요.");
  }
  if (!globalForMongo._mongoClientPromise) {
    globalForMongo._mongoClientPromise = new MongoClient(uri).connect().catch((err) => {
      // 연결에 실패하면 다음 요청에서 다시 시도할 수 있도록 캐시를 비운다
      globalForMongo._mongoClientPromise = undefined;
      throw err;
    });
  }
  return globalForMongo._mongoClientPromise;
}

// 데이터베이스 이름은 접속 주소의 경로(/linknamu)를 따른다.
export async function getClicksCollection(): Promise<Collection<ClickDoc>> {
  const client = await getClient();
  return client.db().collection<ClickDoc>("clicks");
}
