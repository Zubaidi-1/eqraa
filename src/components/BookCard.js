import Image from "next/image";
import Link from "next/link";
export default function BookCard({ work_id, title, cover }) {
  return (
    <div className="flex items-center justify-center rounded ">
      <Link href={`/books/${work_id}`}>
        <Image
          src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
          alt={title}
          width={120}
          height={180}
          className="object-contain rounded hover:scale-105 transition ease-in-out duration-100"
        />
      </Link>
    </div>
  );
}

// ! she said you think the devil has horns? Well, so did I But I was wrong, his hair is combed and he wears a suit and tie
