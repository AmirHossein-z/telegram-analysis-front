import { JSX } from "react";
import { ICardProps } from "../types";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { CardTags } from ".";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../utils";

const CardDesktop = (props: ICardProps): JSX.Element => {
  const { id, name, channelTelegramId, view, share, tags, path } = props;
  const navigate = useNavigate();

  return (
    <section
      className="card cursor-pointer bg-base-100 text-base-content shadow-bg transition-all duration-300 ease-linear hover:-translate-y-2 hover:bg-base-200"
      onClick={() => navigate(`${path}${id}`)}
    >
      <div className="card-body items-center gap-6 text-center">
        {name?.length && name.length > 90 ? (
          <h2 className="card-body text-justify font-normal">
            {name.trim().substring(0, 90)}...
          </h2>
        ) : (
          <h2 className="card-title text-base font-normal">{name?.trim()}</h2>
        )}
        <p className="text-primary">{channelTelegramId}</p>
        <div className="card-actions">
          <button className="badge badge-secondary flex gap-3 !rounded !py-3 md:!py-3">
            {formatNumber(view)}
            <AiFillEye />
          </button>
          <button className="badge badge-success flex gap-3 !rounded border border-base-300 !py-3 md:!py-3">
            {formatNumber(share)}
            <BsFillShareFill />
          </button>
        </div>
        <CardTags tags={tags} />
      </div>
    </section>
  );
};
export default CardDesktop;
