import { twMerge } from "tailwind-merge";

interface SkeletonProps {
  className?: string;
}

const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={twMerge(
        "animate-pulse rounded-md bg-bg-disabled",
        className
      )}
      aria-hidden
    />
  );
};

export default Skeleton;
