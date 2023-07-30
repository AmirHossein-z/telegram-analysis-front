import { JSX, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getChannel } from "../../../apis";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { AiFillEye } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { FaBirthdayCake } from "react-icons/fa";
import { formatNumber, getJalaliDate, getRelativeDate } from "../../../utils";
import { CardTags, Stat } from "../../../components";
import { StatContainer } from "../../../containers";
import { IChannel } from "../../../types";

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
  } else if (channel?.id === 0) {
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
                  {channel.channel_telegram_id}
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
      <StatContainer>
        <Stat
          title="تعداد کل بازدیدها"
          value={formatNumber(channel.view)}
          icon={<AiFillEye />}
        />
        <Stat
          title="تعداد کل اشتراک‌ها"
          value={formatNumber(channel.share)}
          icon={<BsFillShareFill />}
        />
        <Stat
          title="تعداد کل اعضا"
          value={formatNumber(channel.members_count)}
          icon={<FaUserAlt />}
        />
        <Stat
          title="تاریخ ساخت"
          value={getJalaliDate(channel.channel_date_created)}
          icon={<FaBirthdayCake />}
          moreInfo={getRelativeDate(channel.channel_date_created)}
        />
      </StatContainer>
      <p className="my-4 text-justify text-base leading-6 text-base-content">
        {channel.description}
      </p>
      <Link
        to={`/dashboard/channels/${channelId}/posts`}
        className="btn-info btn mb-40"
      >
        لیست پست ها
      </Link>
    </IconContext.Provider>
  );
};

export default ViewChannel;
