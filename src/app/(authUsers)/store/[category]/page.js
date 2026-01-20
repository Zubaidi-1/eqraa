import { deleteListing, getListings } from "@/actions/listing/listingActions";
import { createClient } from "@/utils/supabse/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import DeleteListing from "@/components/DeleteListing";

export default async function StoreListings({ params }) {
  let { category } = await params;

  switch (category) {
    case "novels":
      category = "روايات";
      break;
    case "self":
      category = "تطوير الذات";
      break;
    case "religion":
      category = "علوم دينية";
      break;
    case "university":
      category = "كتب جامعية";
      break;
    case "history":
      category = "تاريخ";
      break;
    case "children":
      category = "كتب اطفال";
      break;
    case "other":
      category = "اخر";
      break;
    default:
      category = "all";
  }

  const { data, error } = await getListings(category);

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#daddd8]">
        <p className="text-xl text-red-600">حدث خطأ أثناء تحميل الكتب</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#daddd8]">
        <p className="text-xl text-[#1c1c1c]">لا توجد كتب في هذا التصنيف</p>
      </div>
    );
  }

  // ! delete
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const user = await supabase.auth.getUser();
  const userID = user.data.user.id;

  return (
    <div className="min-h-screen bg-[#daddd8] py-10 px-4" dir="rtl">
      <h1 className="text-3xl font-bold text-center text-[#1c1c1c] mb-10">
        {category === "all" ? "جميع الكتب" : category}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {data.map((listing) => (
          <div
            key={listing.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex flex-col gap-3"
          >
            {listing.image_url && (
              <img
                src={listing.image_url}
                alt={listing.name}
                className="h-48 w-full object-cover rounded-lg"
              />
            )}

            <h2 className="text-lg font-bold text-[#1c1c1c]">{listing.name}</h2>

            <div className="text-sm text-gray-700 flex flex-col gap-1">
              <p>
                <span className="font-semibold">اسم البائع:</span>{" "}
                {listing.display_name}
              </p>
              <p>
                <span className="font-semibold">المؤلف:</span> {listing.author}
              </p>
              <p>
                <span className="font-semibold">السعر:</span> {listing.price}{" "}
                دنانير
              </p>
              <p>
                <span className="font-semibold">الهاتف:</span>{" "}
                {listing.phone_number}
              </p>
              <p>
                <span className="font-semibold">التصنيف:</span>{" "}
                {listing.category}
              </p>
              <p>
                <span className="font-semibold">التوصيل:</span>{" "}
                {listing.delivery === "نعم" ? "متوفر" : "غير متوفر"}
              </p>
              {userID === listing.user_id ? (
                <DeleteListing listing={listing.id}></DeleteListing>
              ) : (
                ""
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
