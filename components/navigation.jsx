"use client";
import Link from "next/link";
import { Logo } from "./logo";
import { Search, ShoppingCart, User, Menu, ChevronDown, X } from "lucide-react";
import { listCategory } from "@/lib/api/main/listCategory";
import { useState, useEffect, useCallback, useRef } from "react";
import { getCartList } from "@/lib/api/user/cart/listCart";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/lib/store/cartSlice";
import { searchProducts } from "@/lib/api/main/searchProducts";
import { STORAGE } from "@/lib/api/config";
export function Navigation() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.length;

  const searchRef = useRef(null);

  const debouncedSearch = useCallback(async (query) => {
    if (query.trim()) {
      setIsSearching(true);
      try {
        const response = await searchProducts(query, 10);
        if (response.data?.products) {
          setSearchResults(response.data.products);
          setShowResults(true);
        }
      } catch (error) {
        console.error("Error searching products:", error);
      } finally {
        setIsSearching(false);
      }
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        debouncedSearch(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery, debouncedSearch]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await listCategory();
        if (response.data?.categories) {
          const parentCategories = response.data.categories.filter(
            (category) => !category.parent_id || category.parent_id === 0
          );
          setCategories(parentCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await getCartList();
        if (response.data?.cart) {
          response.data.cart.forEach((item) => {
            dispatch(addToCart(item));
          });
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCartCount();
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-8">
              <Logo size="large" />
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/home"
                  className="font-medium hover:text-primary transition-colors"
                >
                  صفحه اصلی
                </Link>
                <div className={`relative ${isLoading ? "" : "group"}`}>
                  <button className="flex items-center gap-1 font-medium hover:text-primary transition-colors">
                    <span>دسته بندی محصولات</span>
                    <ChevronDown size={16} />
                  </button>
                  {!isLoading && (
                    <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                      <div className="py-2">
                        {categories.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products/category/${category.id}`}
                            className="block px-4 py-2 hover:bg-gray-50"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <Link
                  href="/about"
                  className="font-medium hover:text-primary transition-colors"
                >
                  درباره ما
                </Link>
                <Link
                  href="/contact"
                  className="font-medium hover:text-primary transition-colors"
                >
                  تماس با ما
                </Link>
                <Link
                  href="/faq"
                  className="font-medium hover:text-primary transition-colors"
                >
                  سوالات متداول
                </Link>
                <Link
                  href="/terms"
                  className="font-medium hover:text-primary transition-colors"
                >
                  قوانین و مقررات
                </Link>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              {/* Desktop Search */}
              <div className="relative hidden md:block w-64" ref={searchRef}>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="جستجو در محصولات..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pr-10 pl-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() =>
                      searchResults.length > 0 && setShowResults(true)
                    }
                  />
                  <div className="absolute right-3 top-2.5">
                    {isSearching ? (
                      <div className="animate-spin h-5 w-5 border-2 border-primary border-t-transparent rounded-full"></div>
                    ) : (
                      <Search className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {showResults && searchResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-md z-50 max-h-72 overflow-y-auto">
                    <ul className="divide-y divide-gray-100">
                      {searchResults.map((product) => (
                        <li key={product.id}>
                          <Link
                            href={`/products/${product.id}`}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                            onClick={() => setShowResults(false)}
                          >
                            <img
                            src={`${STORAGE}${product.image_path}`}
                              alt={product.title}
                              className="w-10 h-10 object-cover rounded"
                            />
                            <span className="text-sm font-medium text-gray-800 line-clamp-1">
                              {product.title}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Mobile Search Button */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileSearchOpen(true)}
              >
                <Search size={22} className="text-gray-700" />
              </button>

              <Link
                href="/cart"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
              >
                <ShoppingCart size={22} className="text-gray-700" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              <Link
                href="/dashboard/user"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <User size={22} className="text-gray-700" />
              </Link>
              <button className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors">
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Search Modal */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
          <div className="bg-white p-4">
            <div className="flex items-center gap-2">
              <button onClick={() => setIsMobileSearchOpen(false)}>
                <X size={24} className="text-gray-700" />
              </button>
              <input
                type="text"
                placeholder="جستجو..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <div className="bg-white flex-1 overflow-y-auto px-4">
            {isSearching ? (
              <div className="py-4 text-center text-gray-500">
                در حال جستجو...
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {searchResults.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.id}`}
                      className="flex items-center gap-3 px-2 py-3 hover:bg-gray-50 transition"
                      onClick={() => {
                        setIsMobileSearchOpen(false);
                        setSearchQuery("");
                      }}
                    >
                      <img
                            src={`${STORAGE}${product.image_path}`}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="text-sm font-medium text-gray-800">
                        {product.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}
