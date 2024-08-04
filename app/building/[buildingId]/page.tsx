import { getBuildingById, getUserById } from "@/db/queries";
import { notFound } from "next/navigation";
import WalkScore from "./components/walk-score";
import { getWalkScore } from "@/lib/api";
import TransitScore from "./components/transit-score";
import TreeScore from "./components/tree-score";
import CarbonScore from "./components/carbon-score";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BuildingIcon from "@/components/building-icon";
import { Button } from "@/components/ui/button";
import { Home, PencilRuler, PersonStanding } from "lucide-react";
import Link from "next/link";
import PropertyScore from "./components/property-score";
import BikeScore from "./components/bike-score";

export default async function BuildingPage({
  params,
}: {
  params: { buildingId: string };
}) {
  const existingBuilding = await getBuildingById(parseInt(params.buildingId));
  if (!existingBuilding) return notFound();

  const { username } = await getUserById(existingBuilding.userId);
  const { type, lat, lon, width, length, height, occupancy, name } =
    existingBuilding;

  const { transit, bike, walk } = await getWalkScore(lat, lon);

  return (
    <div className="container min-h-dvh py-36">
      <Link href={"/home"}>
        <Button
          className="mb-6 flex items-center gap-3"
          variant="ghost"
          size="sm"
        >
          <Home className="size-4" />
          Home
        </Button>
      </Link>

      <main className="grid grid-cols-8 gap-6">
        <div className="col-span-3 grid h-full gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3.5">
                <BuildingIcon icon={type} />
                <CardTitle>{name}</CardTitle>
              </div>
              <small className="text-primary/40">
                {type} building, created by {username}
              </small>
            </CardHeader>
            <CardContent className="flex gap-6">
              <div className="flex gap-3">
                <PersonStanding />
                {occupancy}
              </div>
              <div className="flex gap-3">
                <PencilRuler />
                {width}ft x {length}ft x {height}ft{" "}
                <span className="text-primary/40">(wlh)</span>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <CardDescription>
                {lat}&#176;&#44; {lon}&#176;
              </CardDescription>
            </CardFooter>
          </Card>

          <CarbonScore
            length={length}
            width={width}
            height={height}
            buildingType={type}
          />
        </div>

        <div className="col-span-5 grid grid-cols-10 gap-6">
          <TreeScore
            width={width}
            length={length}
            className="col-span-7 rounded-lg"
          />
          <BikeScore bike={bike} className="col-span-3" />
          <WalkScore
            className="col-span-4"
            walkscore={walk.walkscore}
            description={walk.description}
          />
          <TransitScore transit={transit} className="col-span-6" />
          <PropertyScore
            latitude={lat}
            longitude={lon}
            length={length}
            width={width}
            height={height}
            className="col-span-10"
          ></PropertyScore>
        </div>
      </main>
    </div>
  );
}
