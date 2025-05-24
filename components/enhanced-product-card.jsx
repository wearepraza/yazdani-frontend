"use client";

import Link from "next/link";
import { ShoppingCart, Star, Plus, Minus, Heart } from "lucide-react";
import { STORAGE } from "@/lib/api/config";
import { addToCart as addToCartAPI } from "@/lib/api/user/cart/addToCart";
import { removeCartItem } from "@/lib/api/user/cart/removeItemCart";
import { toggleFavoriteUser } from "@/lib/api/user/favorites/toggleFavoriteUser";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/lib/store/cartSlice";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

export default function EnhancedProductCard({ product, showActions = true }) {
  const { id, title, price, discountedPrice, discount, image, isNew, rating ,maxDiscount} =
    product;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item.product_id === id);
  const reduxQty = itemInCart?.quantity || 0;
  const isInCart = reduxQty > 0;
  const hasDiscount = discount > 0;

  const [localQty, setLocalQty] = useState(reduxQty);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setLocalQty(reduxQty);
  }, [reduxQty]);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    const optimisticQty = localQty + 1;
    setLocalQty(optimisticQty);

    dispatch(
      addToCart({
        product_id: id,
        quantity: optimisticQty,
        product,
      })
    );

    try {
      const response = await addToCartAPI({
        product_id: id,
        quantity: optimisticQty,
      });
      const realQty = response.data?.item?.quantity || optimisticQty;
      if (realQty !== optimisticQty) {
        setLocalQty(realQty);
        dispatch(addToCart({ product_id: id, quantity: realQty, product }));
      }
    } catch (err) {
      setLocalQty(localQty);
      dispatch(addToCart({ product_id: id, quantity: localQty, product }));
      toast.error("خطا در افزودن به سبد خرید");
    }
  };

  const handleRemoveFromCart = async (e) => {
    e.preventDefault();
    if (localQty <= 0) return;
    const newQty = localQty - 1;
    setLocalQty(newQty);

    if (newQty === 0) {
      dispatch(removeFromCart(id));
      try {
        await removeCartItem({ product_id: id });
      } catch (err) {
        setLocalQty(localQty);
        dispatch(addToCart({ product_id: id, quantity: localQty, product }));
        toast.error("خطا در حذف محصول");
      }
      return;
    }

    dispatch(
      addToCart({
        product_id: id,
        quantity: newQty,
        product,
      })
    );

    try {
      await addToCartAPI({ product_id: id, quantity: newQty });
    } catch (err) {
      setLocalQty(localQty);
      dispatch(addToCart({ product_id: id, quantity: localQty, product }));
      toast.error("خطا در کاهش تعداد");
    }
  };

  const handleFavoriteToggle = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    try {
      const response = await toggleFavoriteUser(id);
      if (response?.data && !response.error) {
        setIsFavorite((prev) => !prev);
      } else {
        toast.error("خطا در تغییر وضعیت علاقه‌مندی");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
      toast.error("اتصال به سرور برقرار نشد");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-xl overflow-hidden transition hover:shadow-md group">
      <Link href={`/products/${id}`} className="block relative">
        <div className="relative h-52 md:h-64 overflow-hidden group">
          <img
            src={
              image
                ? `${STORAGE}${image}`
                : "/placeholder.svg?height=192&width=256&query=product"
            }
            alt={title}
            className="h-full w-full object-contain bg-gray-10 transition-transform duration-500 group-hover:scale-105"
          />

          {showActions && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <button
                onClick={handleFavoriteToggle}
                disabled={isLoading}
                className={`rounded-full bg-white p-2 transition-colors hover:bg-blue-500 hover:text-white ${
                  isFavorite ? "text-red-500 hover:text-white" : "text-gray-800"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`}
                />
              </button>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link
          href={`/products/${id}`}
          className="block hover:text-primary transition"
        >
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 min-h-[48px]">
            {title}
          </h3>
        </Link>

        {rating && (
          <div className="flex items-center gap-1 mb-2">
            <Star size={14} className="text-amber-500" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        )}

        <div className="flex items-center justify-between mt-3">
          <div>
            {hasDiscount && (
              <div className="text-gray-400 line-through text-xs mb-1">
                {price} تومان
              </div>
            )}
            <div className="font-bold text-gray-900">
              {(discountedPrice || price).toLocaleString("fa-IR")} تومان
            </div>
            {maxDiscount && maxDiscount !== "0" && maxDiscount > 0 ? (
              <div className="text-red-500 text-xs mt-2">
                با خرید کارت، تا سقف {maxDiscount.toLocaleString("fa-IR")} تومان تخفیف بگیرید
              </div>
            ) : null}
          </div>

          {showActions && (
            <AnimatePresence mode="wait" initial={false}>
              {localQty > 0 ? (
                <motion.div
                  key="counter"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-center gap-1"
                >
                  <button
                    onClick={handleRemoveFromCart}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">
                    {localQty}
                  </span>
                  <button
                    onClick={handleAddToCart}
                    className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  key="add"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={handleAddToCart}
                  className="p-2 rounded-lg bg-primary/10 hover:bg-primary text-primary hover:text-white transition-colors"
                >
                  <ShoppingCart size={18} />
                </motion.button>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}

