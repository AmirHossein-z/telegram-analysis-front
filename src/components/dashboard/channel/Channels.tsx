import { JSX, useContext, useEffect, useState } from "react";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { getChannels } from "../../../apis";
import AuthContext from "../../../context/AuthProvider";
import { Navigate } from "react-router-dom";
import { CardDesktop, CardMobile, FilterInput, SearchButton } from "../../ui";

interface IChannel {
  id: number;
  name: string;
  description: string;
  channel_telegram_id: string;
  members_count: number;
  view: number;
  share: number;
  tags: string;
  user_id: number;
  created_at: string;
  updated_at: string;
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
        <section className="flex w-full flex-wrap gap-4">
          <FilterInput />
          <SearchButton />
        </section>
        <ChannelList channels={channels} />
      </>
    );
  } else {
    return <Navigate to={"/dashboard/add_channel"} />;
  }
};

interface IChannelListProps {
  channels: IChannel[];
}

const ChannelList = ({ channels }: IChannelListProps): JSX.Element => {
  return (
    <>
      {/* mobile & tablet */}
      <section className="mt-2 items-center justify-center gap-3 md:hidden">
        {channels?.map((channel) => (
          <CardMobile
            key={channel.id}
            name={channel.name}
            channelTelegramId={channel.channel_telegram_id}
            view={channel.view}
            share={channel.share}
            tags={channel.tags}
          />
        ))}
      </section>

      {/* desktop */}
      <section className="mt-2 hidden md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3">
        {channels?.map((channel) => (
          <CardDesktop
            key={channel.id}
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
