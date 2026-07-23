import ShopHeader from "@/components/shop/ShopHeader";
import ShopFooter from "@/components/shop/ShopFooter";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-gradient-to-b from-orange-100 via-amber-50/60 to-white">
      <div className="pointer-events-none fixed -left-32 top-24 -z-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      <div className="pointer-events-none fixed -right-32 top-[40vh] -z-0 h-96 w-96 rounded-full bg-rose-200/30 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 -z-0 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative z-10 flex min-h-screen flex-col">
        <ShopHeader />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">{children}</main>
        <ShopFooter />
      </div>
    </div>
  );
}
