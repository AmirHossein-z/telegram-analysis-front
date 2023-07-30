import { ReactNode } from "react";

interface IStat {
  title: string;
  value: string | number;
  icon: ReactNode;
  moreInfo?: string;
}

const Stat = ({ title, value, icon, moreInfo }: IStat): JSX.Element => {
  return (
    <div className="stat bg-base-100 shadow">
      <div className="stat-figure text-info-content">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value text-2xl text-info-content">{value}</div>
      <div className="stat-desc">{moreInfo}</div>
    </div>
  );
};

export default Stat;
