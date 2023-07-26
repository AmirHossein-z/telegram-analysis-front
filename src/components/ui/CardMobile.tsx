import { JSX } from "react";
import { ICardProps } from "../../types";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { CardTags } from ".";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../utils";

const CardMobile = (props: ICardProps): JSX.Element => {
  const { id, name, channelTelegramId, view, share, tags } = props;
  const navigate = useNavigate();

  return (
    <section
      className="flex cursor-pointer flex-wrap justify-between gap-5 rounded bg-base-100 px-3 py-4 text-base-content shadow-bg transition-all duration-300 ease-linear hover:bg-base-200"
      onClick={() => navigate(`/dashboard/channels/${id}`)}
    >
      <div className="flex flex-grow flex-col items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-[10px] text-primary">{channelTelegramId}</p>
        </div>
        <CardTags tags={tags} />
      </div>
      <div className="flex flex-grow-0 flex-wrap justify-end gap-3">
        {/* reusable  */}
        {/* should be a component this two view and share */}
        <button className="badge badge-secondary flex gap-3 !rounded !py-3 md:!py-3">
          {formatNumber(view)}
          <AiFillEye />
        </button>
        <button className="badge badge-success flex gap-3 !rounded border border-base-300 !py-3 md:!py-3">
          {formatNumber(share)}
          <BsFillShareFill />
        </button>
      </div>
    </section>
  );
};

export default CardMobile;
