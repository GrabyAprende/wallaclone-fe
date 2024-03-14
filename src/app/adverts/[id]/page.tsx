import { FC } from "react";

interface Props {
    params: {
        id: string;
    }
}




const Page: FC<Props> = ({ params }) => {

    return <h1>Hola mundo este es mi id {params.id}</h1>
}

export default Page;