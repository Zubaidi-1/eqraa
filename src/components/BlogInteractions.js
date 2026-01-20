import FavoriteIcon from "@mui/icons-material/Favorite";

export default function BlogInteractions() {
  return (
    <div
      className="flex flex-col justify-center items-center border mx-auto max-w-3xl hrounded gap-4"
      dir="rtl"
    >
      <h1 className="text-black justify-self-start text-3xl">التفاعلات</h1>
      {/* likes */}
      <div dir="rtl" className="text-[#363636]">
        <span>
          الاعجابات: 0 <FavoriteIcon></FavoriteIcon>
        </span>
      </div>
    </div>
  );
}
