"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function ProductDetailRedirect() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  useEffect(() => {
    router.replace(`/products/${id}/edit`);
  }, [id, router]);

  return null;
}
