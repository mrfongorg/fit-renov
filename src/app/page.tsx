import { Hero } from "@/components/Hero";
import { Timeline } from "@/components/Timeline";
import { LeadForm } from "@/components/LeadForm";

export const metadata = {
  title: 'Fit Renov. | 以匠人之手，築你所想之居',
  description: '結合傳統職人工藝與量身定制的現代美學。提供專業室內設計、裝修工程。透明報價，絕無隱藏收費。立即獲取免費初步估價。',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* 導航列簡化版 */}
      <header className="absolute top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-white tracking-wider">
          FIT<span className="text-[var(--accent)]">RENOV.</span>
        </div>
      </header>
      
      <Hero />
      <Timeline />
      <LeadForm />

      {/* 簡單頁尾 */}
      <footer className="bg-[#1A252F] text-gray-400 py-12 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-xl font-bold text-white mb-4 tracking-wider">
            FIT<span className="text-[var(--accent)]">RENOV.</span>
          </div>
          <p className="mb-6">香港專業室內設計與裝修工程</p>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Fit Renov. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
