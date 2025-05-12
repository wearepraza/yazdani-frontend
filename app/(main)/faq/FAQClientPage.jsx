"use client"

import { useState } from "react"

export default function FAQClientPage() {
  const [openItem, setOpenItem] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  const faqs = [
    // General
    {
      id: "g1",
      question: "فونیکسو چیست؟",
      answer:
        "فونیکسو یک فروشگاه آنلاین پیشرو در زمینه فروش محصولات دیجیتال است که از سال ۱۳۹۵ فعالیت خود را آغاز کرده است. ما با هدف ارائه بهترین محصولات با قیمت‌های مناسب و خدمات پس از فروش عالی، همواره تلاش کرده‌ایم تا رضایت مشتریان خود را جلب کنیم.",
    },
    {
      id: "g2",
      question: "چگونه می‌توانم با پشتیبانی فونیکسو تماس بگیرم؟",
      answer:
        "شما می‌توانید از طریق شماره تلفن ۰۲۱-۸۸۸۸۸۸۸۸ در روزهای شنبه تا چهارشنبه از ساعت ۹ صبح تا ۶ عصر و پنجشنبه‌ها از ساعت ۹ صبح تا ۱ بعد از ظهر با پشتیبانی ما تماس بگیرید. همچنین می‌توانید از طریق ایمیل support@phonixo.com با ما در ارتباط باشید.",
    },
    {
      id: "g3",
      question: "آیا فونیکسو گارانتی دارد؟",
      answer:
        "بله، تمامی محصولات فونیکسو دارای گارانتی هستند. مدت زمان گارانتی بسته به نوع محصول متفاوت است و در صفحه محصول ذکر شده است. گارانتی ما شامل تعویض یا تعمیر محصول در صورت بروز مشکل فنی است.",
    },
    {
      id: "g4",
      question: "آیا می‌توانم به صورت حضوری از فروشگاه فونیکسو خرید کنم؟",
      answer:
        "خیر، فونیکسو یک فروشگاه آنلاین است و در حال حاضر فروشگاه فیزیکی ندارد. شما می‌توانید تمامی محصولات ما را از طریق وب‌سایت ما خریداری کنید و ما آن‌ها را برای شما ارسال می‌کنیم.",
    },
    // Orders
    {
      id: "o1",
      question: "چگونه می‌توانم سفارش خود را پیگیری کنم؟",
      answer:
        'شما می‌توانید با وارد شدن به حساب کاربری خود و مراجعه به بخش "سفارش‌های من" وضعیت سفارش خود را مشاهده کنید. همچنین می‌توانید از طریق شماره تماس پشتیبانی، وضعیت سفارش خود را پیگیری نمایید.',
    },
    {
      id: "o2",
      question: "چگونه می‌توانم سفارش خود را لغو کنم؟",
      answer:
        'اگر سفارش شما هنوز پردازش نشده است، می‌توانید با مراجعه به بخش "سفارش‌های من" در حساب کاربری خود، گزینه "لغو سفارش" را انتخاب کنید. اگر سفارش شما در حال پردازش است، باید با پشتیبانی ما تماس بگیرید تا بررسی کنیم که آیا امکان لغو سفارش وجود دارد یا خیر.',
    },
    {
      id: "o3",
      question: "چه زمانی سفارش من ارسال می‌شود؟",
      answer:
        "سفارش‌های شما معمولاً در روز کاری بعد از تأیید پرداخت ارسال می‌شوند. در صورتی که محصول مورد نظر شما در انبار موجود نباشد، زمان ارسال ممکن است طولانی‌تر شود که در این صورت به شما اطلاع داده می‌شود.",
    },
    // Shipping
    {
      id: "s1",
      question: "هزینه ارسال چقدر است؟",
      answer:
        "هزینه ارسال بسته به وزن محصول، مقصد و روش ارسال متفاوت است. شما می‌توانید در صفحه پرداخت، هزینه ارسال را مشاهده کنید. برای سفارش‌های بالای ۵۰۰ هزار تومان، ارسال رایگان است.",
    },
    {
      id: "s2",
      question: "چه روش‌های ارسالی وجود دارد؟",
      answer:
        "ما از طریق پست پیشتاز، تیپاکس و اسنپ‌باکس محصولات را ارسال می‌کنیم. شما می‌توانید در زمان ثبت سفارش، روش ارسال مورد نظر خود را انتخاب کنید.",
    },
    {
      id: "s3",
      question: "چه مدت طول می‌کشد تا سفارش من به دستم برسد؟",
      answer:
        "زمان تحویل بسته به مقصد و روش ارسال متفاوت است. معمولاً سفارش‌ها در تهران ۱ تا ۲ روز کاری و در شهرستان‌ها ۲ تا ۵ روز کاری پس از ارسال به دست مشتری می‌رسند.",
    },
    // Payment
    {
      id: "p1",
      question: "چه روش‌های پرداختی پشتیبانی می‌شوند؟",
      answer:
        "ما پرداخت آنلاین از طریق درگاه‌های بانکی، کارت به کارت و پرداخت در محل (فقط در تهران) را پشتیبانی می‌کنیم.",
    },
    {
      id: "p2",
      question: "آیا می‌توانم به صورت قسطی خرید کنم؟",
      answer:
        'بله، برای برخی از محصولات امکان خرید اقساطی وجود دارد. برای اطلاعات بیشتر به صفحه "خرید اقساطی" مراجعه کنید.',
    },
    {
      id: "p3",
      question: "اگر پرداخت من با مشکل مواجه شود چه کار کنم؟",
      answer:
        "اگر پرداخت شما با مشکل مواجه شود، مبلغ پرداختی معمولاً ظرف ۷۲ ساعت به حساب شما برگشت داده می‌شود. اگر پس از این مدت مبلغ به حساب شما برنگشت، با پشتیبانی ما تماس بگیرید.",
    },
    // Returns
    {
      id: "r1",
      question: "شرایط بازگشت کالا چیست؟",
      answer:
        'در صورتی که از کالای خریداری شده رضایت ندارید، می‌توانید تا ۷ روز پس از دریافت کالا، درخواست بازگشت کالا را ثبت کنید. کالا باید سالم و در بسته‌بندی اصلی باشد. برای اطلاعات بیشتر به صفحه "قوانین و مقررات" مراجعه کنید.',
    },
    {
      id: "r2",
      question: "چگونه می‌توانم کالای خریداری شده را مرجوع کنم؟",
      answer:
        'برای مرجوع کردن کالا، ابتدا باید به حساب کاربری خود مراجعه کرده و در بخش "سفارش‌های من" روی سفارش مورد نظر کلیک کنید. سپس گزینه "درخواست مرجوعی" را انتخاب کرده و دلیل مرجوعی را ذکر کنید. پس از تأیید درخواست، کارشناسان ما با شما تماس خواهند گرفت.',
    },
    {
      id: "r3",
      question: "هزینه بازگشت کالا بر عهده چه کسی است؟",
      answer:
        "اگر کالا دارای مشکل فنی باشد یا اشتباهی از طرف ما رخ داده باشد، هزینه بازگشت بر عهده ماست. در غیر این صورت، هزینه بازگشت بر عهده مشتری است.",
    },
  ]

  const toggleItem = (id) => {
    setOpenItem(openItem === id ? null : id)
  }

  const filteredFaqs = searchTerm
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : faqs

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">سوالات متداول</h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">پاسخ به سوالات رایج شما درباره فروشگاه فونیکسو</p>
          </div>
        </div>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              className="block w-full p-4 pr-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="جستجو در سوالات متداول..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {searchTerm ? (
          // Search Results
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-6">نتایج جستجو</h2>
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                    <button
                      className="flex justify-between items-center w-full py-4 text-right"
                      onClick={() => toggleItem(faq.id)}
                    >
                      <span className="text-lg font-semibold">{faq.question}</span>
                      <svg
                        className={`w-5 h-5 transition-transform ${openItem === faq.id ? "transform rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        openItem === faq.id ? "max-h-96 pb-4" : "max-h-0"
                      }`}
                    >
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-gray-500 text-lg">هیچ نتیجه‌ای یافت نشد!</p>
                  <p className="text-gray-400 mt-2">لطفاً با کلمات کلیدی دیگری جستجو کنید.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          // All FAQs in a single list
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-4 px-8">
              <h2 className="text-xl font-bold text-white">سوالات متداول</h2>
            </div>
            <div className="p-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className="flex justify-between items-center w-full py-4 text-right"
                    onClick={() => toggleItem(faq.id)}
                  >
                    <span className="text-lg font-semibold">{faq.question}</span>
                    <svg
                      className={`w-5 h-5 transition-transform ${openItem === faq.id ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openItem === faq.id ? "max-h-96 pb-4" : "max-h-0"
                    }`}
                  >
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ask a Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">سوال دیگری دارید؟</h2>
          <p className="text-gray-700 mb-6 text-center">
            اگر پاسخ سوال خود را در این صفحه پیدا نکردید، می‌توانید از طریق فرم زیر سوال خود را مطرح کنید. کارشناسان ما
            در اسرع وقت به سوال شما پاسخ خواهند داد.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="نام و نام خانوادگی"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                placeholder="ایمیل"
                className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <textarea
              placeholder="سوال خود را بنویسید..."
              rows="4"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>

            <div className="text-center">
              <button className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200">
                ارسال سوال
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
