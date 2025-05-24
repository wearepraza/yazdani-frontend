import Link from "next/link";
import EnhancedProductCard from "@/components/enhanced-product-card";
import ProductCarousel from "@/components/ProductCarousel";
import { listProducts } from "@/lib/api/main/listProducts";
import { listCategory } from "@/lib/api/main/listCategory";

export default async function HomePage() {
  let carousels = [];
  let parentCategories = [];

  try {
    const [productRes, categoryRes] = await Promise.all([
      listProducts(),
      listCategory()
    ]);

    const allProducts = productRes?.data || [];
    const categories = categoryRes?.data?.categories || [];

    parentCategories = categories.filter(cat => cat.parent_id === null);

  carousels = parentCategories.map(parent => {
  const subIds = categories
    .filter(c => c.parent_id === parent.id)
    .map(c => c.id);
  const relevantIds = [parent.id, ...subIds];

  const products = allProducts.filter(p =>
    relevantIds.includes(p.category_id)
  ).slice(0, 8);

  const normalized = products.map(product => ({
    id: product.id,
    title: product.title,
    price: product.price,
    discountedPrice: product.discount_price,
      maxDiscount: product.max_discount || 0,
    discount: product.discount_price
      ? Math.round(((product.price - product.discount_price) / product.price) * 100)
      : 0,
    image: product.image_path ? `/${product.image_path}` : "/placeholder.svg",
    isNew: true,
    rating: 4.5,
    category: product.category?.name || "بدون دسته‌بندی",
  }));

  return {
    title: parent.name,
    categoryId: parent.id,
    products: normalized
  };
});


    // آخرین کاروسل: همه محصولات
    const allNormalized = allProducts.slice(0, 12).map(product => ({
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discount_price,
      discount: product.discount_price
        ? Math.round(((product.price - product.discount_price) / product.price) * 100)
        : 0,
      image: product.image_path ? `/${product.image_path}` : "/placeholder.svg",
      isNew: true,
      rating: 4.5,
      category: product.category?.name || "بدون دسته‌بندی",
    }));

    carousels.push({
      title: "همه محصولات",
      products: allNormalized
    });

  } catch (error) {
    console.error("Error loading home page:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 py-16 md:px-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-right md:w-1/2">
              <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">فروشگاه آنلاین لوازم جانبی فونیکسو</h1>
              <p className="mb-6 text-lg opacity-90">بهترین محصولات با بهترین قیمت‌ها و ضمانت اصالت کالا</p>
              <Link href="/products">
                <button className="rounded-lg bg-white px-6 py-3 font-bold text-blue-600 transition-all hover:bg-blue-50">
                  مشاهده محصولات
                </button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img src="/electronics-store-interior.png" alt="فروشگاه دیجیتال" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* بخش دسته‌بندی‌ها (فقط parent) */}
      <section className="py-12 md:px-12">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-800 md:text-3xl">دسته‌بندی محصولات</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
            {parentCategories.map(category => (
              <Link href={`/products?category=${category.id}`} key={category.id}>
                <div className="group flex flex-col items-center rounded-lg bg-white p-4 text-center shadow-md transition-all hover:shadow-lg">
                  <div className="mb-3 h-16 w-16 rounded-full bg-blue-100 p-3 group-hover:bg-blue-200">
                    <img
                      src={`/abstract-geometric-shapes.png?height=64&width=64&query=${category.name}`}
                      alt={category.name}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <h3 className="font-medium text-gray-800">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    {carousels.map((carousel, idx) => (
  <ProductCarousel
    key={idx}
    title={carousel.title}
    products={carousel.products}
    categoryId={carousel.categoryId}
  />
))}


    </div>
  );
}
