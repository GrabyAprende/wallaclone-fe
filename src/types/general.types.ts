export interface Advert {
    name: string;
    description: string;
    price: number;
    status: boolean;
    image: string;
    tags: string[];
    _id: string;
    owner: string;
}

export interface UserDetails {
    adverts: Advert[];
    user: {
        email: string;
        username: string;
        _id: string;
    };
}
