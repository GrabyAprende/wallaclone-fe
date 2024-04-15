import { Advert } from "@/types/general.types";
import AdvertCard from "./advertCard";
import NoSearchResult from "./noSearchResult";

interface Props {
  adverts: any[];
}

export default function AdvertsGrid({ adverts }: Props) {
  const advertLength = adverts.length
  return (
    advertLength ? <div className="grid sm:gap-3 md:gap-5 lg:gap-6 gap-3 my-6">
      {adverts.map((advert: Advert) => (
        <AdvertCard key={advert._id} advert={advert} />
      ))}
      </div> : (<NoSearchResult />)
  );
}
