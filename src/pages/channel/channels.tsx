import { JSX, useContext, useEffect, useState } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";

import AuthContext from "../../context/auth-provider";
import { useAbortController, useApiPrivate } from "../../hooks";
import {
  FilterInput,
  CardDesktop,
  CardMobile,
  SearchButton,
  Pagination,
} from "../../components";
import { IChannel } from "../../types";
import { getChannels } from "../../apis";

interface IChannelListProps {
  channels: IChannel[];
}

const Channels = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [channels, setChannels] = useState<IChannel[]>([]);
  const { auth } = useContext(AuthContext);
  const { controller, setSignal } = useAbortController(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });

  const fetchChannels = async () => {
    try {
      setSearchParams({ page: pageInfo.currentPage.toString() });
      setLoading(true);
      const { data } = await getChannels(
        axiosPrivate,
        pageInfo.currentPage,
        parseInt(auth.userId),
        controller
      );
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
        currentPage: data.value?.current_page,
      });
      setChannels(data.value?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  useEffect(() => {
    fetchChannels();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, [pageInfo.currentPage]);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }
  // has channels
  else if (channels?.length > 0) {
    return (
      <>
        <section className="mb-5 flex w-full flex-wrap gap-4">
          <FilterInput />
          <SearchButton />
        </section>
        <ChannelList channels={channels} />
        <Pagination
          currentPage={pageInfo.currentPage}
          totalCount={pageInfo.totalCount}
          pageSize={pageInfo.pageSize}
          siblingCount={1}
          onPageChange={(page: number) =>
            setPageInfo({ ...pageInfo, currentPage: page })
          }
        />
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
      <section className="mb-40 grid grid-cols-1 justify-center gap-5 md:hidden">
        {channels?.map((channel) => (
          <CardMobile
            path={`/dashboard/channels/${channel.id}`}
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
      <section className="mb-20 hidden md:grid md:grid-cols-2 md:items-center md:justify-center md:gap-3">
        {channels?.map((channel) => (
          <CardDesktop
            path={`/dashboard/channels/`}
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
