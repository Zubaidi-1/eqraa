import Link from "next/link";

export default function CategoryCard({ href, label, Icon }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center justify-center gap-3
      bg-[#f1f1f1] text-[#1c1c1c]
      rounded-xl p-6
      shadow-sm
      hover:shadow-md hover:-translate-y-1
      transition-all duration-200"
    >
      <Icon fontSize="large" />
      <span className="text-lg font-semibold">{label}</span>
    </Link>
  );
}
