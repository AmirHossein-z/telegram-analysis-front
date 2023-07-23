import { JSX } from "react";
import { ICardProps } from "../../types";
import { BsFillShareFill } from "react-icons/bs";
import { AiFillEye } from "react-icons/ai";
import { CardTags } from ".";

const CardDesktop = (props: ICardProps): JSX.Element => {
  const { name, channelTelegramId, view, share, tags } = props;

  return (
    <section className="card bg-neutral text-neutral-content">
      <div className="card-body items-center gap-6 text-center">
        <h2 className="card-title">{name}</h2>
        <p>{channelTelegramId}</p>
        <div className="card-actions">
          <button className="badge badge-primary flex gap-3 border border-primary !py-3">
            {view}
            <AiFillEye />
          </button>
          <button className="badge badge-ghost flex gap-3 border border-base-300 !py-3">
            {share}
            <BsFillShareFill />
          </button>
        </div>
        <CardTags tags={tags} />
      </div>
    </section>
  );
};
export default CardDesktop;
