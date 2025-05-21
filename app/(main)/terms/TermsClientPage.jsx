"use client"

export default function TermsClientPage() {
  const pageData = {
    title: "قوانین و مقررات",
    description: "مطالعه‌ی کامل شرایط استفاده از خدمات فروشگاه فونیکسو برای تجربه‌ای مطمئن و حرفه‌ای",
    content: `
      <h2 class="text-xl font-bold mb-4">مقدمه</h2>
      <p class="mb-4">استفاده از وب‌سایت فونیکسو به منزله‌ی پذیرش شرایط و ضوابط زیر می‌باشد. لطفاً این قوانین را با دقت مطالعه فرمایید.</p>

      <h2 class="text-xl font-bold mb-4">۱. ثبت‌نام و حساب کاربری</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>کاربران برای استفاده از برخی خدمات باید در سایت ثبت‌نام کنند.</li>
        <li>مسئولیت حفظ امنیت اطلاعات حساب کاربری بر عهده‌ی خود کاربر است.</li>
        <li>هرگونه سوءاستفاده از حساب دیگران پیگرد قانونی دارد.</li>
      </ul>

      <h2 class="text-xl font-bold mb-4">۲. اطلاعات شخصی و حریم خصوصی</h2>
      <p class="mb-4">اطلاعات کاربران به‌صورت محرمانه نزد فروشگاه محفوظ بوده و تنها برای پردازش سفارش و بهبود تجربه‌ی کاربری استفاده می‌شود.</p>

      <h2 class="text-xl font-bold mb-4">۳. سفارش و پرداخت</h2>
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li>پرداخت از طریق درگاه بانکی امن انجام می‌شود.</li>
        <li>در صورت عدم تأیید نهایی سفارش توسط فروشگاه، مبلغ پرداختی به‌صورت کامل بازگردانده می‌شود.</li>
        <li>ثبت سفارش به منزله‌ی پذیرش کامل شرایط فروشگاه می‌باشد.</li>
      </ul>

      <h2 class="text-xl font-bold mb-4">۴. ارسال و تحویل کالا</h2>
      <p class="mb-4">کالاها معمولاً ظرف ۲۴ ساعت کاری پردازش و ارسال می‌گردند. زمان تحویل به موقعیت مکانی مشتری بستگی دارد.</p>

      <h2 class="text-xl font-bold mb-4">۵. بازگشت و مرجوعی</h2>
      <p class="mb-4">در صورت بروز مشکل در کالا، مشتری تا ۷ روز پس از دریافت کالا می‌تواند درخواست بازگشت ثبت کند، مشروط به این‌که کالا استفاده نشده و در بسته‌بندی اصلی باشد.</p>

      <h2 class="text-xl font-bold mb-4">۶. محدودیت مسئولیت</h2>
      <p class="mb-4">فروشگاه مسئول هرگونه سوءاستفاده از اطلاعات کاربر که خارج از حیطه‌ی کنترل ما باشد، نیست. همچنین تأخیر در ارسال به دلایل خارج از کنترل فروشگاه (مانند شرایط جوی یا تعطیلات رسمی) بر عهده‌ی فروشگاه نمی‌باشد.</p>

      <h2 class="text-xl font-bold mb-4">۷. تغییرات در قوانین</h2>
      <p>فروشگاه حق دارد در هر زمان قوانین و شرایط استفاده را بدون اطلاع قبلی تغییر دهد. استفاده مستمر از سایت به معنی پذیرش این تغییرات است.</p>
    `,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-16">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-90"></div>
          <div className="relative z-10 py-20 px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {pageData.title}
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              {pageData.description}
            </p>
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div
            className="leading-7 text-justify"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </div>
    </div>
  )
}
