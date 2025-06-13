import { getDiscountedPricePercentage } from "@/utils/helper";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ data }) => {
  // Avec Strapi 5, les données sont directement dans 'data'
  const product = data || {};
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "";

  // Accès direct à l'URL de la miniature
  const rawThumbnail = product.thumbnail?.data?.url;
  const thumbnail = rawThumbnail
    ? rawThumbnail.startsWith("http")
      ? rawThumbnail
      : `${apiUrl}${rawThumbnail}`
    : "/default-product.png"; // fallback absolu

  // Formatage du prix en roupies indiennes INR
  const formatCurrency = (value) =>
    typeof value === "number"
      ? new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          maximumFractionDigits: 0,
        }).format(value)
      : "";

  const price = product.price ?? 0;
  const originalPrice = product.original_price;
  const showDiscount = typeof originalPrice === "number" && originalPrice > price;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer rounded-lg shadow"
      aria-label={`Voir le produit ${product.name}`}
    >
      <div className="aspect-square relative w-full">
        <Image
          src={thumbnail}
          alt={product.name || "Image du produit"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4 text-black/[0.9]">
        <h2 className="text-lg font-medium truncate">{product.name}</h2>

        <div className="flex items-center text-black/[0.5] mt-2">
          <p className="mr-2 text-lg font-semibold text-black">
            {formatCurrency(price)}
          </p>

          {showDiscount && (
            <>
              <p className="text-base font-medium line-through">
                {formatCurrency(originalPrice)}
              </p>
              <p className="ml-auto text-base font-medium text-green-600">
                {getDiscountedPricePercentage(originalPrice, price)}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
