import Image from "next/image";
import Link from "next/link";
import { Button } from "primereact/button";

export default function NoSearchResult() {
  return (
    <div className="text-center pt-5">
      <Image
        src="/images/not_results.svg"
        alt="not found"
        width={200}
        height={300}
      />
      <p className="mb-6">
        Parece que por el momento lo que buscas no se encuentra en Wallaclone.
        <br />
        Se el primero en anunciarlo!
      </p>

      <Link href={"/newadvert"} style={{backgroundColor: "#6366f1", padding: '10px 20px', borderRadius: '10px', color: '#fff', fontWeight: 'bold'}} >Crear nuevo anuncio</Link>
    </div>
  );
}
