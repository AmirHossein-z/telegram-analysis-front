import { JSX, useContext, useEffect, useState } from "react";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { getChannels } from "../../../apis";
import AuthContext from "../../../context/AuthProvider";
import { Link, Navigate } from "react-router-dom";

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
  const { controller } = useAbortController();

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
    };
  }, []);

  console.log("channels :>> ", channels);
  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }
  // has channels
  else if (channels.length > 0) {
    return (
      <>
        <section className="flex flex-wrap items-center justify-center gap-2">
          <select
            className="select-bordered select-info select"
            name="selectChannel"
            style={{ direction: "rtl" }}
            defaultValue="0"
          >
            <option value="0" disabled>
              فیلتر بر اساس ...
            </option>
            <option value="filter_1">
              فیلتر بر اساس بیشترین بازدید در تمام پست ها
            </option>
            <option value="filter_2">
              فیلتر بر اساس کمترین بازدید در تمام پست ها
            </option>
            <option value="filter_3">
              فیلتر بر اساس بیشترین اشتراک گذاری در تمام پست ها
            </option>
            <option value="filter_4">
              فیلتر بر اساس کمترین اشتراک گذاری در تمام پست ها
            </option>
          </select>
          <input
            type="text"
            placeholder="جست و جو"
            className="input-bordered input-info input w-full max-w-xs"
          />
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

const ChannelList = ({ channels = [] }: IChannelListProps) => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>id</th>
            <th>نام کانال</th>
            <th>آیدی تلگرام</th>
          </tr>
        </thead>
        <tbody>
          {channels?.map((channel) => (
            <tr key={channel.id}>
              <th>1</th>
              <td>{channel.id}</td>
              <td>{channel.name}</td>
              <td>{channel.channel_telegram_id ?? ""}</td>
              <td>
                <Link to={`${channel.id}`} className="link-primary link">
                  مشاهده پست های کانال
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Channels;
