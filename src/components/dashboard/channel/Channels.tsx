import { JSX, useContext, useEffect, useState } from "react";
import { useApiPrivate } from "../../../hooks";
import { getChannels } from "../../../apis";
import AuthContext from "../../../context/AuthProvider";
import AddChannel from "./AddChannel";

interface IChannel {
  status: boolean;
  value?: {
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
  }[];
}

const Channels = (): JSX.Element => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(true);
  const [Channel, setChannel] = useState<IChannel>({
    status: false,
    value: [],
  });
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        setLoading(true);
        const { data } = await getChannels(axiosPrivate, parseInt(auth.userId));
        setChannel({ status: data?.status, value: data?.value });
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchChannels();
  }, []);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }
  // has channel
  else if (Channel.status) {
    return <main>channels</main>;
  } else {
    return <AddChannel />;
  }
};

export default Channels;
