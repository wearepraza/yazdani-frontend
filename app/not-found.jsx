import Link from "next/link";
import MainLayout from "./(main)/layout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <h1 className="text-6xl font-bold text-red-500 mb-4">۴۰۴</h1>
        <h2 className="text-2xl font-semibold mb-2">صفحه مورد نظر پیدا نشد</h2>
        <p className="text-gray-500 mb-6">متاسفانه صفحه‌ای که به دنبال آن بودید وجود ندارد.</p>
        <Link href="/">
          <span className="inline-block px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/80 transition">بازگشت به صفحه اصلی</span>
        </Link>
      </div>
    </MainLayout>
  );
} 