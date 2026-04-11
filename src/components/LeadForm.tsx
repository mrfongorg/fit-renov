"use client";

import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';

type FormData = {
  name: string;
  whatsapp: string;
  area: string;
  size: string;
  budget: string;
};

export function LeadForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    whatsapp: '',
    area: '',
    size: '',
    budget: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "請輸入稱呼";
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "請輸入 WhatsApp 號碼";
    } else if (!/^\d{8}$/.test(formData.whatsapp.trim())) {
      newErrors.whatsapp = "請輸入有效的 8 位數字香港電話號碼";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.area.trim()) newErrors.area = "請輸入屋苑或地區";
    if (!formData.size.trim()) newErrors.size = "請輸入實用面積";
    if (!formData.budget.trim()) newErrors.budget = "請選擇或輸入預算";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep1()) setStep(2);
  };

  const prevStep = () => setStep(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSuccess) {
    return (
      <section id="lead-form" className="py-24 bg-[var(--bg-card)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-bold text-[var(--text-heading)] mb-4">資料提交成功！</h2>
          <p className="text-lg text-[var(--text-body)] mb-8">
            感謝您的查詢。我們的裝修顧問將於 24 小時內透過 WhatsApp 與您聯絡，為您提供初步估價。
          </p>
          <a 
            href={`https://wa.me/852${formData.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center btn-primary px-8 py-4 rounded-full font-semibold gap-2"
          >
            直接 WhatsApp 我們
          </a>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="py-24 bg-[var(--bg-card)]">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-heading)] mb-4">獲取免費初步估價</h2>
          <p className="text-lg text-[var(--text-body)]">只需 1 分鐘填寫基本資料，我們將為您量身定制裝修方案。</p>
        </div>

        <div className="bg-white dark:bg-[#1E1E1E] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 md:p-12">
          {/* Progress Bar */}
          <div className="flex items-center justify-center mb-8 relative">
            <div className="flex items-center w-full max-w-xs relative z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 1 ? 'bg-[var(--accent)] text-white' : 'bg-gray-200 text-gray-500'}`}>1</div>
              <div className={`flex-1 h-1 mx-2 ${step >= 2 ? 'bg-[var(--accent)]' : 'bg-gray-200'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${step >= 2 ? 'bg-[var(--accent)] text-white' : 'bg-gray-200 text-gray-500'}`}>2</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[var(--text-heading)] mb-2">如何稱呼您？</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="例如：陳生 / 林小姐"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-[var(--text-heading)] mb-2">WhatsApp 號碼</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 dark:bg-gray-800 dark:border-gray-700">
                      +852
                    </span>
                    <input
                      type="tel"
                      id="whatsapp"
                      name="whatsapp"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      className={`input-field rounded-l-none ${errors.whatsapp ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="9876 5432"
                      maxLength={8}
                    />
                  </div>
                  {errors.whatsapp && <p className="mt-1 text-sm text-red-500">{errors.whatsapp}</p>}
                </div>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-full btn-primary py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 mt-8"
                >
                  下一步 <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div>
                  <label htmlFor="area" className="block text-sm font-medium text-[var(--text-heading)] mb-2">裝修屋苑或地區</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    className={`input-field ${errors.area ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="例如：日出康城 / 沙田第一城"
                  />
                  {errors.area && <p className="mt-1 text-sm text-red-500">{errors.area}</p>}
                </div>
                <div>
                  <label htmlFor="size" className="block text-sm font-medium text-[var(--text-heading)] mb-2">實用面積 (平方呎)</label>
                  <input
                    type="number"
                    id="size"
                    name="size"
                    value={formData.size}
                    onChange={handleChange}
                    className={`input-field ${errors.size ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="例如：450"
                  />
                  {errors.size && <p className="mt-1 text-sm text-red-500">{errors.size}</p>}
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-[var(--text-heading)] mb-2">預算範圍</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className={`input-field ${errors.budget ? 'border-red-500 focus:ring-red-500' : ''}`}
                  >
                    <option value="">請選擇預算</option>
                    <option value="20萬以下">20萬以下</option>
                    <option value="20-30萬">20萬 - 30萬</option>
                    <option value="30-50萬">30萬 - 50萬</option>
                    <option value="50萬以上">50萬以上</option>
                  </select>
                  {errors.budget && <p className="mt-1 text-sm text-red-500">{errors.budget}</p>}
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-4 rounded-lg font-bold text-[var(--text-body)] border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <ArrowLeft className="w-5 h-5" /> 返回
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-primary py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? '提交中...' : '確認提交'}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
