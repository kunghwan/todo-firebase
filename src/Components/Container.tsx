import { twMerge } from "tailwind-merge";

type container = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Container = (props: container) => {
  return (
    <div {...props} className={twMerge(ContainerStyle, props?.className)}></div>
  );
};

const ContainerStyle = "flex text-2xl ";
