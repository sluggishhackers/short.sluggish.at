import { getLinkViaEdge } from "@/lib/planetscale";
import { Background, Footer, Nav } from "@dub/ui";
import { constructMetadata } from "@dub/utils";
import { ShieldBan } from "lucide-react";
import { notFound } from "next/navigation";

export const runtime = "edge";

export const metadata = constructMetadata({
  title: "Banned Link – Dub.co",
  description: "This link has been banned for violating our terms of service.",
  noIndex: true,
});

export default async function BannedPage({
  params,
}: {
  params: { domain: string; key: string };
}) {
  const domain = params.domain;
  const key = decodeURIComponent(params.key);

  const data = await getLinkViaEdge(domain, key);

  // if the link doesn't exist
  if (!data) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col justify-between">
      <Nav />
      <div className="mx-2 my-10 flex max-w-md flex-col items-center space-y-5 px-2.5 text-center sm:mx-auto sm:max-w-lg sm:px-0 lg:mb-16">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gray-300 bg-white/30">
          <ShieldBan className="h-6 w-6 text-gray-400" />
        </div>
        <h1 className="font-display text-5xl font-bold">차단된 링크</h1>
        <p className="text-lg text-gray-600">
          이 링크는 서비스 이용약관을 위반하여 차단되었습니다.
        </p>
        <a
          href="https://slg.sh"
          className="rounded-full bg-gray-800 px-10 py-2 font-medium text-white transition-colors hover:bg-black"
        >
          무료로 링크를 생성해보세요.
        </a>
      </div>
      <Footer />
      <Background />
    </main>
  );
}
