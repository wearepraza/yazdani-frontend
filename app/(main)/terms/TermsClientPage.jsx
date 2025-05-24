"use client"

import { useEffect, useState } from 'react';
import { detailsPages } from '../../../lib/api/admin/pages/detailsPages';

export default function TermsClientPage() {
  const [pageData, setPageData] = useState({
    title: '',
    description: '',
    content: '',
  });

  const defaultContent = `
    <h2>قوانین و مقررات استفاده از سایت</h2>
    <p>به وب‌سایت ما خوش آمدید. استفاده از این سایت به معنای پذیرش شرایط زیر می‌باشد:</p>
    <ul>
      <li>1. کاربران موظف به وارد کردن اطلاعات صحیح و کامل هنگام ثبت‌نام هستند.</li>
      <li>2. هرگونه استفاده غیرمجاز از محتوا یا خدمات سایت پیگرد قانونی دارد.</li>
      <li>3. سایت مجاز است در هر زمان شرایط و قوانین را تغییر دهد.</li>
      <li>4. تمامی قیمت‌ها و موجودی‌ها ممکن است بدون اطلاع قبلی تغییر کنند.</li>
      <li>5. استفاده از خدمات به منزله پذیرش تمامی شرایط ذکرشده می‌باشد.</li>
    </ul>
    <p>در صورت وجود هرگونه سوال، از طریق بخش تماس با ما در ارتباط باشید.</p>
  `;

  useEffect(() => {
    async function fetchPageDetails() {
      const response = await detailsPages('agreement'); 
      if (!response.error) {
        setPageData(response.data);
      }
    }
    fetchPageDetails();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {pageData.title || "قوانین و مقررات"}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageData.description || "لطفاً قبل از استفاده از خدمات سایت، قوانین زیر را مطالعه فرمایید."}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div
            className="leading-7 text-justify"
            dangerouslySetInnerHTML={{ __html: pageData.content || defaultContent }}
          />
        </div>
      </div>
    </div>
  )
}
