import React from 'react';
import { ClipboardList, PenTool, Hammer, PaintBucket, Sofa, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: "諮詢與初步方案",
    desc: "透明報價，絕無隱藏收費",
    icon: <ClipboardList className="w-6 h-6 text-white" />,
  },
  {
    title: "設計落實與簽約",
    desc: "量身定制空間美學",
    icon: <PenTool className="w-6 h-6 text-white" />,
  },
  {
    title: "基礎工程與水電",
    desc: "隱蔽工程，品質保證",
    icon: <Hammer className="w-6 h-6 text-white" />,
  },
  {
    title: "泥水與木工基礎",
    desc: "扎實底功，歷久常新",
    icon: <PaintBucket className="w-6 h-6 text-white" />,
  },
  {
    title: "傢俬定制與安裝",
    desc: "工廠直銷，精準契合",
    icon: <Sofa className="w-6 h-6 text-white" />,
  },
  {
    title: "驗收與完美交場",
    desc: "細心執修，安心入伙",
    icon: <CheckCircle className="w-6 h-6 text-white" />,
  }
];

export function Timeline() {
  return (
    <section id="timeline" className="py-20 bg-[var(--bg-page)] text-[var(--text-body)]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)] mb-4">6 大裝修流程</h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            我們將繁複的 28 步工序簡化為清晰的 6 大階段，每一步都有專人跟進，讓您輕鬆掌握工程進度。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative bg-[var(--bg-card)] p-8 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-[var(--accent)]/50 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="absolute -top-5 -left-5 w-10 h-10 bg-[var(--text-heading)] text-white flex items-center justify-center rounded-full font-bold text-lg shadow-lg z-10">
                {index + 1}
              </div>
              <div className="w-14 h-14 bg-[var(--accent)] rounded-full flex items-center justify-center mb-6 shadow-sm">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-[var(--text-heading)] mb-2">
                {step.title}
              </h3>
              <p className="text-gray-500">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
