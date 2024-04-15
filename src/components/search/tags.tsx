import { Advert } from "@/types/general.types"
import { Chip } from "primereact/chip"

export default function Tags({ tags }: { tags: Advert['tags'] }) {
    return (
      tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          style={{
            fontSize: "0.7rem",
            marginRight: "5px",
            backgroundColor: "#6366F1",
            color: "#fff",
            fontWeight: "bold",
          }}
        />
      ))
    )
  }