import { ReactNode } from "react";

const StatContainer = ({ children }: { children: ReactNode }) => {
  return (
    <section className="my-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
      {children}
    </section>
  );
};

export default StatContainer;
