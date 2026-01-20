import SchoolIcon from "@mui/icons-material/School";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import ChurchIcon from "@mui/icons-material/Church";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AltRouteIcon from "@mui/icons-material/AltRoute";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";

export default function Store() {
  return (
    <div className="min-h-screen bg-[#daddd8] flex flex-col items-center justify-center py-12 gap-10">
      <h1 className="text-4xl font-bold text-[#1c1c1c]">المتجر</h1>

      <Link
        href="/store/create"
        className="bg-[#1c1c1c] text-white text-lg px-6 py-2 rounded-lg hover:bg-[#333] transition"
      >
        اعرض كتابك +
      </Link>

      <h3 className="text-2xl text-[#1c1c1c]">تصفح حسب التصنيف</h3>

      <div
        dir="rtl"
        className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl px-4"
      >
        <CategoryCard
          href="/store/novels"
          label="روايات"
          Icon={AutoStoriesIcon}
        />
        <CategoryCard
          href="/store/self"
          label="تطوير الذات"
          Icon={SelfImprovementIcon}
        />
        <CategoryCard
          href="/store/university"
          label="كتب جامعية"
          Icon={SchoolIcon}
        />
        <CategoryCard
          href="/store/religion"
          label="علوم دينية"
          Icon={ChurchIcon}
        />
        <CategoryCard
          href="/store/history"
          label="تاريخ"
          Icon={HistoryEduIcon}
        />
        <CategoryCard
          href="/store/children"
          label="كتب أطفال"
          Icon={ChildCareIcon}
        />
        <CategoryCard href="/store/other" label="أخرى" Icon={AltRouteIcon} />
        <CategoryCard
          href="/store/no-filter"
          label="جميع الكتب"
          Icon={DoneAllIcon}
        />
      </div>
    </div>
  );
}
