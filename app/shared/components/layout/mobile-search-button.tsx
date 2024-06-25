import Link from "next/link";
import { Search } from "lucide-react";

export const MobileSearchButton = () => {
  return (
    <div className="md:hidden">
      <Link href="/search">
        <Search size={24} />
      </Link>
    </div>
  );
};
