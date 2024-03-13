import { Advert } from "@/types/general.types";
import { FC } from "react";

interface Props {
    params: {
        id: string;
    }
}

// async function getData(props: Props) {
//     const { params } = props;
//     const res = await fetch(`http://35.169.246.52/api/advert/id/${id}`);

//     if (!res.ok){
//         console.log("error")
//     }

//     return res.json()
// }


// export default async function Page(props: Props) {

//    // const advert = { name: "hola", price: "200"} as Advert

//     const advert = getData();


//     return <h1>Hola mundo este es mi id {advert.id}</h1>
// }
