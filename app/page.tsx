import { client, microcmsConfigured } from "@/libs/client";
import Link from "next/link";

// --- TYPES ---
type Tapestry = {
  id: string;
  title: string;
  image: {
    url: string;
    height: number;
    width: number;
  };
};

// New Type for the Home API
type HomeContent = {
  hero_image?: {
    url: string;
    height: number;
    width: number;
  };
};

export default async function Home() {
  // 1. Check Config
  if (!microcmsConfigured || !client) {
    return <div className="p-10">Connecting to MicroCMS...</div>;
  }

  // 2. Fetch Both APIs in Parallel
  const [galleryData, homeData] = await Promise.all([
    // Fetch the list of art
    client.get<{ contents: Tapestry[] }>({ endpoint: "gallery" }).catch(() => null),
    // Fetch the single hero image
    client.get<HomeContent>({ endpoint: "home" }).catch(() => null),
  ]);

  const galleryItems = galleryData?.contents || [];
  
  // Use the uploaded image, or a fallback if she deletes it
  const heroImageUrl = homeData?.hero_image?.url || '/hero.jpg'; 

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-serif selection:bg-[#C5A059] selection:text-white">
      
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 left-0 w-full px-8 py-5 flex justify-between items-center z-50 bg-black text-white">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-serif text-[#C5A059] tracking-wider">
            Sara Obi
          </span>
        </div>

        <div className="hidden md:flex space-x-8 text-xs font-sans tracking-[0.15em] uppercase">
          <Link href="/" className="hover:text-[#C5A059] transition-colors">Home</Link>
          <Link href="#concept" className="hover:text-[#C5A059] transition-colors">About</Link>
          <Link href="#collection" className="hover:text-[#C5A059] transition-colors">Collection</Link>
          <Link href="#contact" className="hover:text-[#C5A059] transition-colors">Contact</Link>
        </div>

        <div className="md:hidden text-[#C5A059] cursor-pointer text-xs tracking-widest">
           MENU
        </div>
      </nav>

      {/* --- HERO SECTION (Dynamic MicroCMS Image) --- */}
      <header className="relative h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        
        {/* Dynamic Background Layer */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('${heroImageUrl}')`, 
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 text-white animate-fade-in-up">
          <h1 className="text-5xl md:text-8xl font-light tracking-widest mb-6 drop-shadow-lg">
            SARA OBI
          </h1>
          <p className="text-xs md:text-sm font-sans tracking-[0.3em] uppercase opacity-90">
            Tokyo • Upcycled • Art
          </p>
        </div>
        
        <div className="absolute bottom-10 z-10 text-white animate-bounce">
          <span className="text-[10px] tracking-widest font-sans opacity-70">SCROLL</span>
        </div>
      </header>

      {/* --- CONCEPT SECTION --- */}
      <section id="concept" className="py-32 px-6 max-w-2xl mx-auto text-center">
        <span className="block text-[10px] font-sans tracking-[0.3em] text-[#C5A059] mb-8 uppercase">
          The Concept
        </span>
        <h2 className="text-3xl leading-relaxed font-light mb-8 text-[#2C2C2C]">
          Woven History,<br/>Reimagined.
        </h2>
        <p className="text-sm leading-8 text-stone-600 font-sans font-light">
          We collect vintage Obi sashes from the Showa era, transforming them 
          into modern tapestries. Each piece tells a silent story of celebration, 
          woven with gold threads and silk, now reimagined for your space.
        </p>
      </section>

      {/* --- GALLERY COLLECTION --- */}
      <section id="collection" className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16 border-b border-stone-100 pb-4">
            <h3 className="text-3xl font-light italic text-[#2C2C2C]">Collection</h3>
            <span className="hidden md:block text-xs font-sans tracking-widest text-stone-400">
              {galleryItems.length} WORKS AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {galleryItems.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="relative overflow-hidden aspect-[3/4] mb-6 bg-stone-100">
                  <img
                    src={item.image.url}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                </div>
                <h4 className="text-lg font-light tracking-wide text-[#2C2C2C]">{item.title}</h4>
                <p className="text-[10px] font-sans text-[#C5A059] mt-1 tracking-widest uppercase">
                  View Details
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer id="contact" className="bg-black text-stone-500 py-12 px-8 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-sans tracking-widest uppercase">
          <p>© 2024 Sara Obi / Tokyo</p>
          <div className="space-x-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#C5A059] transition">Instagram</a>
            <a href="#" className="hover:text-[#C5A059] transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}