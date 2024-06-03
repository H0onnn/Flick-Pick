import Image from "next/image";
import { Flex, Card, CardContent } from "@/app/shared/components";
import { UserRound } from "lucide-react";

interface CreditsCardProps {
  crewName: string;
  job: string;
  profilePath: string;
}

export const CreditsCard = ({
  crewName,
  job,
  profilePath,
}: CreditsCardProps) => {
  return (
    <Flex className="gap-2">
      <Card className="relative w-[56px] h-[56px] border-border border-solid border-2 overflow-hidden">
        <Flex align="center" justify="center">
          <CardContent className={profilePath ? "" : "bg-gray-100"}>
            {profilePath ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500/${profilePath}`}
                className="object-cover w-full h-full rounded-md"
                fill={true}
                alt="감독/출연진"
              />
            ) : (
              <UserRound
                size={32}
                className="text-gray-300 transform translate-y-1/3"
              />
            )}
          </CardContent>
        </Flex>
      </Card>
      <Flex direction="column" className="py-1.5 gap-1 body2">
        <p>{crewName}</p>
        <p className="body4 text-gray-500">{job}</p>
      </Flex>
    </Flex>
  );
};
