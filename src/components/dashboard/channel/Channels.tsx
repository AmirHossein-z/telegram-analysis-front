import { JSX, useContext, useEffect, useState } from "react";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { getChannels } from "../../../apis";
import AuthContext from "../../../context/AuthProvider";
import { Link, Navigate } from "react-router-dom";
import { CardDesktop, CardMobile, FilterInput, SearchButton } from "../../ui";
import { IChannel } from "../../../types";

interface IChannelListProps {
  channels: IChannel[];
}

const Channels = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const { controller, setSignal } = useAbortController(false);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const { data } = await getChannels(
          axiosPrivate,
          parseInt(auth.userId),
          controller
        );
        setChannels([...data.value]);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchChannels();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }
  // has channels
  else if (channels.length > 0) {
    return (
      <>
        <section className="mb-5 flex w-full flex-wrap gap-4">
          <FilterInput />
          <SearchButton />
        </section>
        <ChannelList channels={channels} />
        <Link
          to={"/dashboard/add_channel"}
          className="btn-warning btn fixed bottom-[5rem] left-2 md:bottom-4 md:left-4"
        >
          افزودن کانال
        </Link>
      </>
    );
  } else {
    return <Navigate to={"/dashboard/add_channel"} />;
  }
};

const ChannelList = ({ channels }: IChannelListProps): JSX.Element => {
  return (
    <>
      {/* mobile & tablet */}
      <section className="mb-40 grid grid-cols-1 items-start justify-center gap-5 md:hidden">
        {channels?.map((channel) => (
          <CardMobile
            key={channel.id}
            id={channel.id}
            name={channel.name}
            channelTelegramId={channel.channel_telegram_id}
            view={channel.view}
            share={channel.share}
            tags={channel.tags}
          />
        ))}
      </section>

      {/* desktop */}
      <section className="hidden md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3">
        {channels?.map((channel) => (
          <CardDesktop
            key={channel.id}
            id={channel.id}
            name={channel.name}
            channelTelegramId={channel.channel_telegram_id}
            view={channel.view}
            share={channel.share}
            tags={channel.tags}
          />
        ))}
      </section>
    </>
  );
};

export default Channels;
