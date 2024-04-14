"use client";

import AdvertsGrid from "@/components/search/advertsGrid";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Paginator } from "primereact/paginator";
import { ProgressSpinner } from "primereact/progressspinner";
import { Slider, SliderChangeEvent } from "primereact/slider";
import { useContext, useEffect, useState } from "react";
//import { MessagesContext } from '@/context/messagesContext';

interface Props {
  params: {
    query: string;
  };
}

async function getData(query: string) {
  try {
    const adverts = await fetch(
      `https://coderstrikeback.es/api/adverts?${query}`
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

// const { showSuccessMessage,
//   showInfoMessage,
//   showErrorMessage
// } = useContext(MessagesContext); 

export default function Page({ params: { query } }: Props) {
  const [adverts, setAdverts] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState({ name: "" });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 100]);
  const [advertStatus, setAdvertStatus] = useState(null);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  const orderByList = [
    { name: "De más barato a más caro", value: "ASC" },
    { name: "De más caro a más barato", value: "DESC" },
  ];
  const advertStatusOptions = [
    { name: "Venta", value: true },
    { name: "Compra", value: false },
  ];

  const onPageChange = (event: any) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const filterAdverts = async () => {
    let queryUrl: string = ``;

    query ? (queryUrl += `name=${query}&description=${query}`) : null;
    selectedTag.name ? (queryUrl += `&tags=${selectedTag.name}`) : null;
    priceFilter[0] > 0
      ? (queryUrl += `&priceMin=${priceFilter[0] * 100}`)
      : (queryUrl += `&priceMin=0`);
    priceFilter[1] < 100
      ? (queryUrl += `&priceMax=${priceFilter[1] * 100}`)
      : null;
    selectedOrder
      ? (queryUrl += `&sort=${selectedOrder === "ASC" ? "" : "-"}price`)
      : null;
    advertStatus !== null ? (queryUrl += `&status=${advertStatus}`) : null;
    first ? (queryUrl += `&skip=${first}`) : null;
    rows ? (queryUrl += `&limit=${rows}`) : null;

    try {
      const filteredAdvert = await getData(queryUrl);
      setAdverts(filteredAdvert);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setIsFetching(true);
    getData(`name=${query || ""}&description=${query || ""}`).then((resp) => {
      setAdverts(resp);
      setIsFetching(false);
    }).catch();

    fetchTags().then((tags) => setTags(tags));
  }, [query, first, rows]);

  return (
    <>
      {/*filter zone*/}
      <header className="p-3 border-y-1 border-300">
        <div className="w-9 xl:w-9 m-auto justify-content-around flex flex-wrap gap-1 xl:gap-2">
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
              value={advertStatus}
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
            <Button label="Buscar" onClick={filterAdverts} />
          </div>
        </div>
      </header>
      {/* end filter zone*/}

      <main className="w-11 lg:w-9 m-auto flex flex-column">
        {isFetching ? (
          <ProgressSpinner style={{width: '50px', height: '50px', margin: 'auto'}} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
          
        ) : (
          <AdvertsGrid adverts={adverts.slice(first, first + rows)} />
        )}

        <div className="p-3 mt-6">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={adverts.length}
            rowsPerPageOptions={[10, 20, 30]}
            onPageChange={onPageChange}
          />
        </div>
      </main>
    </>
  );
}
