import { JSX } from "react";
import { ICardProps } from "../types";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { Link } from "react-router-dom";
import { formatNumber } from "../utils";

const CardMobile = (props: ICardProps): JSX.Element => {
  const { id, name, channelTelegramId, view, share, tags, path } = props;

  return (
    <section className="flex cursor-pointer flex-wrap justify-between gap-5 rounded bg-base-100 px-3 py-4 text-base-content shadow-bg transition-all duration-300 ease-linear hover:bg-base-200">
      <div className="flex flex-grow flex-col items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          {name?.length && name.length > 90 ? (
            <h2 className="card-body text-justify font-normal">
              {name.trim().substring(0, 90)}...
            </h2>
          ) : (
            <h2 className="card-title text-base font-normal">{name?.trim()}</h2>
          )}
          <p className="text-[10px] text-primary">{channelTelegramId}</p>
        </div>
        {tags}
      </div>
      <div className="flex flex-grow-0 flex-wrap justify-end gap-3">
        <button className="badge badge-secondary flex gap-3 !rounded !py-3 md:!py-3">
          {formatNumber(view)}
          <AiFillEye />
        </button>
        <button className="badge badge-success flex gap-3 !rounded border border-base-300 !py-3 md:!py-3">
          {formatNumber(share)}
          <BsFillShareFill />
        </button>
      </div>
      <Link
        to={`${path}${id}`}
        className="absolute left-0 top-0 h-full w-full"
      />
    </section>
  );
};

export default CardMobile;
