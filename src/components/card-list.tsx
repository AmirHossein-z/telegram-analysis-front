import { CardTags, CardDesktop, CardMobile } from ".";
import { IChannel, IPost } from "../types";

type ICardListIProps = { list: (IChannel | IPost)[] };

// : "md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3"
const CardList = ({ list }: ICardListIProps) => {
  return (
    <>
      {/* mobile & tablet */}
      <section className="mb-40 grid grid-cols-1 justify-center gap-5 md:hidden">
        {list?.map((item) => {
          if ("channel_telegram_id" in item) {
            const channel = item as IChannel;
            return (
              <CardMobile
                path={`/dashboard/channels/`}
                key={channel.id}
                id={channel.id}
                name={channel.name}
                channelTelegramId={channel.channel_telegram_id}
                view={channel.view}
                share={channel.share}
                tags={<CardTags tags={channel.tags} />}
              />
            );
          }
          if ("details" in item) {
            const post = item as IPost;
            return (
              <CardMobile
                path={`/dashboard/channels/${post.channel_id}/posts/`}
                key={post.id}
                id={post.id}
                view={post.view}
                name={post.details}
                share={post.share}
                tags={<CardTags tags={post.tags} />}
              />
            );
          }
        })}
      </section>

      {/* desktop */}
      <section className="hidden md:grid md:grid-cols-2 md:place-items-stretch md:justify-center md:gap-3">
        {list?.map((item) => {
          if ("channel_telegram_id" in item) {
            const channel = item as IChannel;
            return (
              <CardDesktop
                path={`/dashboard/channels/`}
                key={channel.id}
                id={channel.id}
                name={channel.name}
                channelTelegramId={channel.channel_telegram_id}
                view={channel.view}
                share={channel.share}
                tags={<CardTags tags={channel.tags} />}
              />
            );
          }
          if ("details" in item) {
            const post = item as IPost;
            return (
              <CardDesktop
                path={`/dashboard/channels/${post.channel_id}/posts/`}
                key={post.id}
                name={post.details}
                id={post.id}
                view={post.view}
                share={post.share}
                tags={<CardTags tags={post.tags} />}
              />
            );
          }
        })}
      </section>
    </>
  );
};

export default CardList;
