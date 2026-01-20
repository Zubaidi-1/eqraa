export default function Card({ icon }) {
  return (
    <div className="bg-[#1c1c1c] text-[#daddd8] p-4 rounded-full shadow-2xl shadow-[#1c1c1c] hover:scale-105 transition ease-in-out duration-75">
      {icon}
    </div>
  );
}
