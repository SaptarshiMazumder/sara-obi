import { client, microcmsConfigured } from "@/libs/client";

// 1. Define what a "Tapestry" looks like
type Tapestry = {
  id: string;
  title: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

export default async function Home() {
  // 2. Fetch data from MicroCMS (only when configured)
  if (!microcmsConfigured || !client) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center space-y-3">
          <h1 className="text-2xl font-bold tracking-wide">Missing MicroCMS config</h1>
          <p className="text-gray-600 text-sm">
            Set <code className="font-mono">MICROCMS_SERVICE_DOMAIN</code> and{" "}
            <code className="font-mono">MICROCMS_API_KEY</code> in{" "}
            <code className="font-mono">.env.local</code>, then restart{" "}
            <code className="font-mono">npm run dev</code>.
          </p>
        </div>
      </div>
    );
  }

  let data: { contents: Tapestry[] } | null = null;
  let fetchError: string | null = null;

  try {
    data = await client.get<{ contents: Tapestry[] }>({ endpoint: "gallery" });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    fetchError = msg;
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-white text-black font-sans flex items-center justify-center px-6">
        <div className="max-w-xl w-full text-center space-y-3">
          <h1 className="text-2xl font-bold tracking-wide">MicroCMS request failed</h1>
          <p className="text-gray-600 text-sm">
            This usually means your <code className="font-mono">serviceDomain</code> or{" "}
            the <code className="font-mono">endpoint</code> name is wrong. You’re currently
            requesting endpoint <code className="font-mono">gallery</code>.
          </p>
          {fetchError ? (
            <pre className="text-left text-xs bg-gray-50 border border-gray-200 rounded p-3 overflow-auto">
              {fetchError}
            </pre>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* HEADER */}
      <header className="py-20 text-center">
        <h1 className="text-4xl font-bold tracking-widest uppercase mb-4">Sara Obi</h1>
        <p className="text-gray-500 text-sm">Upcycled Vintage Tapestries</p>
      </header>

      {/* GALLERY GRID */}
      <main className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {data.contents.map((item: Tapestry) => (
          <div key={item.id} className="group cursor-pointer">
            {/* Image */}
            <div className="overflow-hidden mb-4">
              <img
                src={item.image.url}
                alt={item.title}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Text Info */}
            <h2 className="text-lg font-medium">{item.title}</h2>
            <p className="text-gray-400 text-xs mt-1">VIEW DETAILS →</p>
          </div>
        ))}
      </main>

      {/* FOOTER */}
      <footer className="py-10 text-center text-gray-400 text-xs mt-20">
        © 2024 Sara Obi. All rights reserved.
      </footer>
    </div>
  );
}