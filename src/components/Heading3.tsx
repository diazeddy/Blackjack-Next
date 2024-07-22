import { ReactNode } from "react";

interface Heading1Props {
  children: ReactNode;
}

const Heading3 = ({ children }: Heading1Props) => {
  return (
    <div
      className="scroll-m-20 text-2xl font-semibold tracking-tight"
      style={{ lineHeight: "inherit" }}
    >
      {children}
    </div>
  );
};

export default Heading3;
