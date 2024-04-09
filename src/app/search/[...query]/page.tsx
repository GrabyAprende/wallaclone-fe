"use client";

import Image from "next/image";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { useEffect, useState } from "react";

interface Props {
  params: {
    query: string;
  };
}

async function getData(query: string) {
    console.log(query)
  try {
    const adverts = await fetch(
      `https://coderstrikeback.es/api/adverts?name=${query}&description=${query}`
    );

    if (!adverts.ok) {
      console.log("error");
    }
    return adverts.json();
  } catch (error) {
    console.log("Error fetching");
  }
}

const fetchTags = async () => {
  try {
    const response = await fetch("https://coderstrikeback.es/api/tags");
    if (!response.ok) {
      throw new Error("Failed to fetch tags");
    }
    return response.json().then(({ tags }) => {
      let data = tags.map((tag: string) => ({ name: tag }));
      return data;
    });
  } catch (error) {
    console.error(error);
  }
};

export default function Page({ params: { query } }: Props) {
  const [adverts, setAdverts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 100]);
  const [adverStatus, setAdvertStatus] = useState(null);

  const orderByList = [
    { name: "De más barato a más caro", value: "ASC" },
    { name: "De más caro a más barato", value: "DESC" },
  ];
  const advertStatusOptions = [
    { name: "Venta", value: true },
    { name: "Compra", value: false },
  ];

  useEffect(() => {
    getData(query).then((resp) => setAdverts(resp));
    fetchTags().then((tags) => setTags(tags));
  }, [query]);

  return (
    <>
      {/*filter zone*/}
      <header className="m-auto justify-content-center flex gap-4 p-3 border-y-1 border-300">
        <div>
          <Dropdown
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.value)}
            options={tags}
            optionLabel="name"
            placeholder="categoría"
            className="w-10rem flex-1 flex align-items-center justify-content-center"
          />
        </div>

        <div>
          <Dropdown
            value={selectedOrder}
            onChange={(e) => setSelectedOrder(e.value)}
            options={orderByList}
            optionLabel="name"
            placeholder="Ordenar por"
            className="w-15rem flex-1 flex align-items-center justify-content-center"
          />
        </div>

        <div>
          <Dropdown
            value={adverStatus}
            onChange={(e) => setAdvertStatus(e.value)}
            options={advertStatusOptions}
            optionLabel="name"
            placeholder="Venta o compra"
            className="w-13rem flex-1 flex align-items-center justify-content-center"
          />
        </div>

        <div className="flex gap-3 align-items-center justify-content-center">
          <span className="w-2rem">{priceFilter[0] * 100}</span>
          <Slider
            className="w-14rem"
            value={priceFilter}
            onChange={(e: SliderChangeEvent) =>
              setPriceFilter(e.value as [number, number])
            }
            range
          />
          <span className="w-5rem">
            {priceFilter[1] * 100 === 10000
              ? "Sin limite"
              : priceFilter[1] * 100}
          </span>
        </div>

        <div>
          <Button label="Buscar" />
        </div>
      </header>
      {/* end filter zone*/}

      <main className="w-9 m-auto">
        <div className="grid my-6">
          {adverts.map(({_id, name}) => (
            <div key={_id}>{name}</div>
          ))}
        </div>
      </main>
    </>
  );
}
