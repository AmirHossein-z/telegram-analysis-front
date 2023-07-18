import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAllUserChannelsHas, setChannel } from "../../../apis";
import { useApiPrivate, useCancelToken } from "../../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IchannelInfo {
  id: number;
  channel_name: string;
}
interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const SelectChannel = ({ setStep }: IProps) => {
  const axiosPrivate = useApiPrivate();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [channels, setChannels] = useState<IchannelInfo[]>([]);
  const [selectChannel, setSelectChannel] = useState({ channelId: "" });
  const { cancelToken, cancel } = useCancelToken();

  const getAllChannels = async () => {
    try {
      setLoading(true);
      const { data } = await getAllUserChannelsHas(axiosPrivate, cancelToken);
      setChannels(data?.value);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        toast.warn("مشکلی پیش آمده است بعدا تلاش کنید");
      }
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { data } = await setChannel(axiosPrivate, selectChannel);
      setLoading(false);
      setStep(5);
      toast.success("اطلاعات کانال با موفقیت ثبت شد");
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        toast.warn("مشکلی پیش آمده است بعدا تلاش کنید");
      }
      if (error?.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectChannel({ channelId: e.target.value });
  };

  if (loading) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <span className="loading loading-dots loading-lg"></span>
        <p>لطفا قندشکن خود را روشن نگه دارید و صبور باشید!</p>
      </div>
    );
  } else if (channels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <button type="button" onClick={getAllChannels}>
          تلاش دوباره
        </button>
        <p>لطفا از روشن بودن قندشکن خود اطمینان حاصل کنید</p>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col flex-wrap items-center gap-3"
      >
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">
              لطفا کانال مورد نظر را انتخاب کنید
            </span>
          </label>
          <select
            className="select-bordered select-info select"
            name="selectChannel"
            onChange={onChange}
            style={{ direction: "rtl" }}
          >
            {channels?.map((channel) => (
              <option value={channel.id} key={channel.id}>
                {channel.channel_name}
              </option>
            ))}
          </select>
          <label className="label">
            <span className="label-text-alt">
              لطفا کانال مد نظر خود را انتخاب کنید
            </span>
          </label>
        </div>

        <div className="flex justify-center">
          <button
            className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus ${
              loading ? "btn-disabled" : ""
            }`}
          >
            انتخاب
          </button>
        </div>

        <h1 className="text-warning">هشدار</h1>
        <p>
          وقتی کانال را انتخاب کنید،تمام پست های آن کانال گرفته شده و ذخیره می
          شود.
        </p>
        <p>پس ممکن است این فرایند کمی طول بکشد صبور باشید</p>
      </form>
    </>
  );
};

export default SelectChannel;
