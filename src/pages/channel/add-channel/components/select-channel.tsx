import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { getAllUserChannelsHas, setChannel } from "../../../../apis";
import { useAxiosPrivate } from "../../../../hooks";
import { toast } from "react-toastify";

interface IchannelInfo {
  id: number;
  channel_name: string;
}

interface IProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const SelectChannel = ({ setStep }: IProps) => {
  const [channels, setChannels] = useState<IchannelInfo[]>([]);
  const [selectChannel, setSelectChannel] = useState({ channelId: "" });
  const {
    loading: loadingFetch,
    response: responseFetch,
    error: errorFetch,
    fetchData: getAllChannels,
  } = useAxiosPrivate(getAllUserChannelsHas());
  const {
    loading: loadingSubmit,
    response: responseSubmit,
    fetchData: submitChannel,
    error: errorSubmit,
  } = useAxiosPrivate(setChannel(selectChannel));

  useEffect(() => {
    if (responseFetch !== null) {
      setChannels(responseFetch?.value);
    }
  }, [responseFetch]);

  useEffect(() => {
    if (responseSubmit !== null) {
      setStep(5);
      toast.success("اطلاعات کانال با موفقیت ثبت شد");
    }
  }, [responseSubmit]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitChannel();
  };

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectChannel({ channelId: e.target.value });
  };

  if (loadingFetch) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <span className="loading loading-dots loading-lg"></span>
        <p>لطفا قندشکن خود را روشن نگه دارید و صبور باشید!</p>
      </div>
    );
  }

  if (errorFetch || errorSubmit) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        مشکلی پیش آمده است
      </section>
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
            disabled={loadingSubmit}
            className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus ${
              loadingSubmit ? "btn-disabled" : ""
            }`}
          >
            {loadingSubmit ? (
              <div>
                <span className="loading loading-spinner loading-md"></span>
              </div>
            ) : (
              <>انتخاب</>
            )}
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
