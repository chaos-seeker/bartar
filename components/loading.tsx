import { cn } from "@/utils/cn";

interface LoadingProps {
  className?: string;
}

export const Loading = (props: LoadingProps) => {
  return (
    <div className={cn("py-1 flex items-center justify-center", props.className)}>
      <div className="flex items-center space-x-2">
        <span
          className="bg-primary size-3.5 animate-bounce rounded-full"
          style={{ animationDelay: '0s' }}
        ></span>
        <span
          className="bg-primary size-3.5 animate-bounce rounded-full"
          style={{ animationDelay: '0.5s' }}
        ></span>
        <span
          className="bg-primary size-3.5 animate-bounce rounded-full"
          style={{ animationDelay: '1s' }}
        ></span>
      </div>
    </div>
  );
};
