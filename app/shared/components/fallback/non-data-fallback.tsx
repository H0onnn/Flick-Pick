import { Card } from "@/app/shared/components";
import { cn } from "@/app/shared/lib/utils";

interface NonDataFallbackProps {
  icon?: React.ReactNode;
  fallbackText: React.ReactNode;
  className?: string;
}

export const NonDataFallback = ({
  icon,
  fallbackText,
  className,
}: NonDataFallbackProps) => {
  const cardClass =
    "flex flex-col items-center justify-center gap-3 w-full min-h-80 h-full shadow-none border border-border border-solid rounded-lg";

  return (
    <Card className={cn([cardClass, className])}>
      {icon && icon}
      <p className="body2 text-gray-700 text-center">{fallbackText}</p>
    </Card>
  );
};
