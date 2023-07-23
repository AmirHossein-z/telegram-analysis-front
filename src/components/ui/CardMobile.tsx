import { JSX } from "react";
import { ICardProps } from "../../types";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { CardTags } from ".";

const CardMobile = (props: ICardProps): JSX.Element => {
  const { name, channelTelegramId, view, share, tags } = props;

  return (
    <section className="flex flex-wrap justify-between gap-5 rounded bg-neutral px-3 py-4 text-neutral-content">
      <div className="flex flex-grow flex-col items-start justify-between gap-6">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-[10px] text-base-300">{channelTelegramId}</p>
        </div>
        <CardTags tags={tags} />
      </div>
      <div className="flex flex-grow-0 flex-wrap justify-end gap-3">
        {/* reusable  */}
        {/* should be a component this two view and share */}
        <button className="badge badge-primary flex gap-3 !rounded border border-primary !py-3 md:!py-3">
          {view}
          <AiFillEye />
        </button>
        <button className="badge badge-ghost flex gap-3 !rounded border border-base-300 !py-3 md:!py-3">
          {share}
          <BsFillShareFill />
        </button>
      </div>
    </section>
  );
};

export default CardMobile;
