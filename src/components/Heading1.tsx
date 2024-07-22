import { ReactNode } from "react";

interface Heading1Props {
  children: ReactNode;
}

const Heading1 = ({ children }: Heading1Props) => {
  return (
    <div
      className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
      style={{ lineHeight: "inherit" }}
    >
      {children}
    </div>
  );
};

export default Heading1;
