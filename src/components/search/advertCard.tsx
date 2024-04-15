import Image from "next/image";
import Link from "next/link";
import Tags from "./tags";
import { Advert } from "@/types/general.types";
import { Span } from "next/dist/trace";
import { Tag } from "primereact/tag";

export default function AdvertCard({ advert }: any) {
  const { _id, image, name, price, tags, description, status } = advert;

  return (
    <Link
      className="col p-0 w-15rem max-w-18rem"
      key={_id}
      href={`/adverts/${_id}`}
      style={{ color: "inherit" }}
    >
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: "10px 10px 0 0" }}
      >
        <Image
          src={image}
          alt={name}
          width={300}
          height={250}
          className=""
          style={{ objectFit: "cover", objectPosition: "70% 50%" }}
        />
      </div>
      <div className="m-1">
        <div className="flex justify-content-between">
          <span className="font-bold text-lg mb-0">{`${price} €`}</span>
          <Tag value={status ? "venta" : "compra"}></Tag>
        </div>
        <p className="mb-0">{name}</p>
        <p
          className="mb-3"
          style={{
            maxLines: "1",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: "1",
          }}
        >
          {description}
        </p>
        <Tags tags={tags} />
      </div>
    </Link>
  );
}
