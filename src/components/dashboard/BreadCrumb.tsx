import { Link, useLocation } from "react-router-dom";
import { JSX } from "react";

const mapToPersian: { [key: string]: string } = {
  dashboard: "داشبورد",
  profile: "پروفایل",
  channels: "کانال ها",
  tags: "تگ ها",
  statistics: "آمار",
  edit: "ویرایش",
  add_channel: "افزودن کانال",
};

const BreadCrumbs = (): JSX.Element => {
  const location = useLocation();

  let currentLink = "";
  const crumbs = location.pathname
    .split("/")
    .filter((crumb) => crumb !== "")
    .map((crumb) => {
      currentLink += `/${crumb}`;

      return (
        <li key={crumb}>
          <Link to={currentLink}>{mapToPersian[crumb] ?? crumb}</Link>
        </li>
      );
    });

  return (
    <section className="breadcrumbs text-sm" style={{ direction: "ltr" }}>
      <ul>{crumbs}</ul>
    </section>
  );
};

export default BreadCrumbs;