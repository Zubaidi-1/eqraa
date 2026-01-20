import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import Card from "@/components/Card";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import ReviewsIcon from "@mui/icons-material/Reviews";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
export default async function Dashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  let userName;
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    userName = user?.user_metadata?.display_name;
  } catch (error) {
    console.log("Auth error:", error);
  }

  return (
    <div className="min-h-screen bg-[#daddd8] px-4 py-10 flex flex-col justify-center items-center">
      <h1 className="text-[#1c1c1c] text-4xl text-center mb-10">
        ! مرحبًا، {userName}
      </h1>
      <div className="flex gap-8">
        <div className="flex flex-col justify-center items-center gap-1.5">
          <Card icon={<AttachMoneyIcon fontSize="large" />} />
          <p className="text-[#1c1c1c] text-lg"> عرضت 7 كتب </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1.5">
          <Card icon={<ReviewsIcon fontSize="large" />} />
          <p className="text-[#1c1c1c] text-lg"> راجعت 3 كتب </p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1.5">
          <Card icon={<ModeEditOutlineIcon fontSize="large" />} />
          <p className="text-[#1c1c1c] text-lg">كتبت 5 مقالات</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-1.5">
          <Card icon={<BeenhereIcon fontSize="large" />} />
          <p className="text-[#1c1c1c] text-lg">انهيت 4 كتب</p>
        </div>
      </div>
    </div>
  );
}
