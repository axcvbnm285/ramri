import LoginForm from "@/features/auth/components/LoginForm";
import AuthShell from "@/components/auth/AuthShell";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-purple-50">
      <AuthShell
        tagline="Manage your store, your way."
        subline="Products, orders, inventory and analytics — all in one place."
      >
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </AuthShell>
    </div>
  );
}
