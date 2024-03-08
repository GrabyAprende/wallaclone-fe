import { Anuncio } from "@/types/general.types";
import { FC } from "react";

interface Props {
    params: {
        id: string;
    }
}




const Page: FC<Props> = ({ params }) => {

    const anuncio = { name: "hola", price: "200"} as Anuncio

    return <h1>Hola mundo este es mi id {params.id}</h1>
}

export default Page;