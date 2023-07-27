import { JSX, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getChannel } from "../../../apis";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { IChannel } from "../../../types";
import { AiFillEye } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaBirthdayCake } from "react-icons/fa";
import { formatNumber, getJalaliDate, getRelativeDate } from "../../../utils";
import { CardTags } from "../../ui";
import { PostList } from ".";

enum ChannelType {
  private = "خصوصی",
  group = "گروه",
  supergroup = "سوپر گروه",
  channel = "کانال",
  bot = "ربات",
}

const ViewChannel = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useApiPrivate();
  const { controller, setSignal } = useAbortController(false);
  const [showPosts, setShowPosts] = useState(false);
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

  useEffect(() => {
    getChannelById();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  } else if (channel.id === 0) {
    return (
      <button className="btn-secondary btn" onClick={getChannelById}>
        لود دوباره
      </button>
    );
  }

  return (
    <IconContext.Provider value={{ size: "23px" }}>
      <section className="">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl text-secondary">{channel.name}</h1>
              {channel.type === "channel" ? (
                <a
                  target="_black"
                  referrerPolicy="no-referrer"
                  href={`https://t.me/${channel.channel_telegram_id}`}
                  className="text-sm text-base-300 hover:underline"
                >
                  {channel.channel_telegram_id}@
                </a>
              ) : (
                <p className="text-sm text-base-300">
                  {channel.channel_telegram_id}@
                </p>
              )}
            </div>
            <p className="badge badge-warning !p-4">
              {ChannelType[channel.type as keyof typeof ChannelType]}
            </p>
          </div>
          <CardTags tags={channel.tags} />
        </div>
      </section>
      <section className="my-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
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
        <ChannelStat
          title="تاریخ ساخت"
          value={getJalaliDate(channel.channel_date_created)}
          icon={<FaBirthdayCake />}
          moreInfo={getRelativeDate(channel.channel_date_created)}
        />
      </section>
      <p className="my-4 text-justify text-base leading-6 text-base-content">
        {channel.description}
      </p>
      {showPosts ? (
        <PostList />
      ) : (
        <button
          className="btn-info btn mb-40"
          onClick={() => {
            setShowPosts(true);
          }}
        >
          لیست پست ها
        </button>
      )}
    </IconContext.Provider>
  );
};

interface IChannelStat {
  title: string;
  value: string | number;
  icon: ReactNode;
  moreInfo?: string;
}

const ChannelStat = ({
  title,
  value,
  icon,
  moreInfo,
}: IChannelStat): JSX.Element => {
  return (
    <div className="stat bg-base-100 shadow">
      <div className="stat-figure text-info-content">{icon}</div>
      <div className="stat-title">{title}</div>
      <div className="stat-value text-2xl text-info-content">{value}</div>
      <div className="stat-desc">{moreInfo}</div>
    </div>
  );
};

export default ViewChannel;
