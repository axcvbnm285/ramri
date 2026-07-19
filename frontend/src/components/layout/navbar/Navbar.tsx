import SearchBar from "./SearchBar";
import NotificationButton from "./NotificationButton";
import ThemeToggle from "./ThemeToggle";
import ProfileMenu from "./ProfileMenu";

export default function Navbar() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <SearchBar />

      <div className="flex items-center gap-4">
        <NotificationButton />

        <ThemeToggle />

        <ProfileMenu />
      </div>
    </header>
  );
}