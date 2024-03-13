// components/AdvertForm.tsx

import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Advert } from "@/types/general.types";


const AdvertForm = () => {
    // const [name, setName] = useState("");
    // const [image, setImage] = useState("");
    // const [description, setDescription] = useState("");
    // const [price, setPrice] = useState("");
    // const [status, setType] = useState<Advert['status']>(true);
    // const [tags, setTags] = useState("");
    // const router = useRouter();

    // const handleSubmit = (e: React.FormEvent) => {
    //     e.preventDefault();
    //     try {
    //         const advertisement: Advert = {
    //             name,
    //             image,
    //             description,
    //             price: parseFloat(price),
    //             status,
    //             tags: tags.split(',').map(tag => tag.trim()), // Separar los tags por comas y eliminar espacios en blanco alrededor de cada tag
    //         };

    //         const response = axios('/api/createAdvert', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(advertisement),
    //         });

    //         if (!response.ok) {
    //             throw new Error('No se ha podido crear el anuncio');
    //         }
    //         //si la creación fue exitosa, redireccionamos a la pag de detalles
    //         router.push("/advertDetail");

    //     } catch (error) {
    //         console.error('Error al crear anuncio:', error);
    //     }


    //     router.push("/advertDetail");
    // };

    // return (
    //     <section className="container">
    //         <h1>Crea tu anuncio</h1>
    //         <form onSubmit={handleSubmit}>
    //             <div>
    //                 <label>Nombre:</label>
    //                 <input
    //                     type="text"
    //                     id="text"
    //                     name="nombre"
    //                     placeholder="Nombre del anuncio"
    //                     value={name}
    //                     required
    //                     onChange={(e) => setName(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Imagen:</label>
    //                 <input
    //                     type="text"
    //                     value={image}
    //                     onChange={(e) => setImage(e.target.value)} />
    //             </div>
    //             <div>
    //                 <label>Descripción:</label>
    //                 <textarea
    //                     value={description}
    //                     onChange={(e) => setDescription(e.target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 <label>Precio:</label>
    //                 <input
    //                     type="text"
    //                     value={price}
    //                     onChange={(e) => setPrice(e.target.value)} />
    //             </div>
    //             <fieldset>
    //                 <div>
    //                     <legend>
    //                         <label>Tipo de anuncio:</label>
    //                     </legend>
    //                     <select value={type} onChange={(e) => setType(e.target.value)}>
    //                     <option value="">Selecciona...</option>
    //                     <option value="venta">Venta</option>
    //                     <option value="busqueda">Búsqueda</option>
    //                     </select>
    //                 </div>
    //             </fieldset>
    //             <div>
    //                 <label>Tags:</label>
    //                 <input
    //                     type="text"
    //                     value={tags}
    //                     onChange={(e) => setTags(e.target.value)}
    //                 />
    //             </div>
    //             <button type="submit">Crear Anuncio</button>
    //         </form>
    //     </section>
    // );
};

export default AdvertForm;
