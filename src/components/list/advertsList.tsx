import { Carousel } from 'primereact/carousel';
import Image from 'next/image';
import Link from 'next/link';
import { Advert } from '@/types/general.types';

async function getData(tag: string | undefined) {
    try {
        const res = tag 
            ? await fetch(`https://coderstrikeback.es/api/adverts?tags=${tag}`) 
            : await fetch(`https://coderstrikeback.es/api/adverts`); 
    
        if (res.ok) {
            const data = await res.json();
            return data;
        } else {
            const errorData = await res.json();
            console.error("Error en adversList", errorData.message)
        }
    
    } catch (err) {
        console.error("Error inesperado en adversList", err)
        throw err;
    }
}

export default async function AdvertsListFetch({tag} : { tag?: string | undefined}) {
    const products = await getData(tag);

    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3,
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2,
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1,
        },
    ];

    const carouselItemTemplate = (product: any) => {
        return (
            <Link href={{ pathname: `/adverts/${product._id}` }}>
                <div className="border-1 surface-border border-round m-1 text-center py-5">
                    <div className="mb-3">
                        {/* TODO: LAS IMAGENES PEQUEÑAS TIENEN QUE SER 177PX POR 118 */}
                        <Image
                            width={177}
                            height={118}
                            src={product.image}
                            alt={product.name}
                            className="shadow-2"
                        />
                    </div>
                    <div>
                        <h4 className="p-mb-1">{product.name}</h4>
                        <h6 className="mt-0 mb-3">{product.price} €</h6>
                    </div>
                </div>
            </Link>
        );
    };

    return (
        <div className="col-12">
            <Carousel
                value={products}
                numVisible={3}
                numScroll={3}
                responsiveOptions={carouselResponsiveOptions}
                itemTemplate={carouselItemTemplate}
            ></Carousel>
        </div>
    );
}
