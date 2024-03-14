import { Carousel } from 'primereact/carousel';
import Image from 'next/image';
import Link from 'next/link';

async function getData() {
    const res = await fetch("http://35.169.246.52/api/adverts");

    if (!res.ok){
        console.log("error")
    }

    return res.json()
}

export default async function AdvertsListFetch(){

    const products = await getData();

    const carouselResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const carouselItemTemplate = (product: any) => {
        return (

        <Link href={{pathname: `/adverts/${product._id}`}}>
            <div className="border-1 surface-border border-round m-1 text-center py-5">
                <div className="mb-3">
                    {/* TODO: LAS IMAGENES PEQUEÑAS TIENEN QUE SER 177PX POR 118 */}
                    <Image width={177} height={118} src={product.image} alt={product.name} className="shadow-2" />
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
                <Carousel value={products} numVisible={3} numScroll={3} responsiveOptions={carouselResponsiveOptions} itemTemplate={carouselItemTemplate}></Carousel>
            </div>
    );
};