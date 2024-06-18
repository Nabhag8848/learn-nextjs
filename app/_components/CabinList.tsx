import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }: { filter: string }) {
  const cabins = await getCabins();
  if (!cabins.length) return null;
  let displayCabins;
  switch (filter) {
    case "all": {
      displayCabins = cabins;
      break;
    }
    case "small": {
      displayCabins = cabins.filter((c) => c.max_capacity <= 3);
      break;
    }
    case "medium": {
      displayCabins = cabins.filter(
        (c) => c.max_capacity > 3 && c.max_capacity < 8
      );
      break;
    }
    case "large": {
      displayCabins = cabins.filter((c) => c.max_capacity > 7);
      break;
    }
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displayCabins?.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
