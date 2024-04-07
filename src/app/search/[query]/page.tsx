import Image from "next/image";

interface Props {
    params: {
        query: string;
    };
}

async function getData(query: string) {
    try {
        const adverts = await fetch(`https://coderstrikeback.es/api/adverts?name=${query}&description=${query}`);
        
        if (!adverts.ok){
            console.log("error")
        }
        return adverts.json()
        
    } catch (error) {
        console.log('Error fetching')
    }
}

export default async function Page({params: {query}}: Props) {

    const adverts = await getData(query);
    return (
        <>
            <h1>{query}</h1>
            <ul>
                {adverts.map(({name, _id, image}) => (
                <li key={_id}>
                    <p>{name}</p>
                    <Image src={image} alt={name} width={300} height={300} />

                </li>
                ))}
            </ul>
        </>
    
    )

}