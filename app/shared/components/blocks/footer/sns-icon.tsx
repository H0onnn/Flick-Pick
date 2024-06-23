import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import { Link as LinkIcon } from "lucide-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/shared/components/ui";

interface SnsIconProps {
  trigger: React.ReactNode;
  icon: string | StaticImageData;
  title: string;
  description?: string;
  href: string;
}

export const SnsIcon = ({
  trigger,
  icon,
  title,
  description,
  href,
}: SnsIconProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>{trigger}</HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex space-x-4">
          <div className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image src={icon} alt={title} fill />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@{title}</h4>
            <p className="text-sm">{description}</p>
            <div className="flex items-center pt-2">
              <LinkIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <span className="text-xs text-muted-foreground">
                  Go to {title}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
