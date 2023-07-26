import { Children, JSX, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel, getPosts } from "../../../apis";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { IChannel } from "../../../types";
import { AiFillEye } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { formatNumber } from "../../../utils";
import { CardTags } from "../../ui";

const ViewChannel = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useApiPrivate();
  const { controller, setSignal } = useAbortController(false);
  const [channel, setChannel] = useState<IChannel>({
    channel_date_created: "",
    channel_date_updated: "",
    channel_telegram_id: "",
    description: "",
    id: 0,
    members_count: 0,
    share: 0,
    name: "",
    tags: "",
    user_id: 0,
    view: 0,
    type: "",
  });

  useEffect(() => {
    const getChannelById = async () => {
      try {
        setLoading(true);
        const { data } = await getChannel(axiosPrivate, channelId, controller);
        setChannel(data.value[0]);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };

    getChannelById();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  } else if (channel.id === 0) {
    return <button className="btn-secondary btn">fetch again?</button>;
  }

  return (
    <IconContext.Provider value={{ size: "25px" }}>
      <section className="">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-secondary">{channel.name}</h1>
              <p className="text-sm text-base-300">
                {channel.channel_telegram_id}
              </p>
            </div>
            <p className="badge badge-warning !p-4">{channel.type}</p>
          </div>
          <CardTags tags={channel.tags} />
        </div>
      </section>
      <section className="my-4 grid grid-cols-1 items-center gap-2 sm:grid-cols-2 md:grid-cols-3">
        <ChannelStat
          title="تعداد کل بازدیدها"
          value={formatNumber(channel.view)}
          icon={<AiFillEye />}
        />
        <ChannelStat
          title="تعداد کل اشتراک‌ها"
          value={formatNumber(channel.share)}
          icon={<BsFillShareFill />}
        />
        <ChannelStat
          title="تعداد کل اعضا"
          value={formatNumber(channel.members_count)}
          icon={<FaUserAlt />}
        />
      </section>
      <p>baghie etellat channel ro neshon bedam</p>
      <button className="btn-info btn">لیست پست ها</button>
      {/* <PostList /> */}
    </IconContext.Provider>
  );
};

interface IChannelStat {
  title: string;
  value: string | number;
  icon: ReactNode;
}

const ChannelStat = ({ title, value, icon }: IChannelStat): JSX.Element => {
  return (
    <div className="stat bg-base-100 shadow">
      <div className="stat-figure text-info-content">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value text-2xl text-info-content">{value}</div>
    </div>
  );
};

interface IPost {
  id: number;
  details: string;
  view: number;
  share: number;
  type: number;
  tags: string;
  channelId: number;
  created_at: string;
  updated_at: string;
}

const PostList = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [page, setPage] = useState(1);
  const { controller, setSignal } = useAbortController(false);

  useEffect(() => {
    const getPostsByChannelId = async () => {
      try {
        setLoading(true);
        const { data } = await getPosts(
          axiosPrivate,
          channelId,
          page,
          controller
        );
        setPosts(data.value);
        setLoading(false);
      } catch (err: any) {
        console.log(err);
        setLoading(false);
      }
    };

    getPostsByChannelId();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  console.log("posts :>> ", posts);

  return <div>list posts</div>;
};

export default ViewChannel;
