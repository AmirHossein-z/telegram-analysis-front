import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { IChannelData } from "../../../types";
import { getProfile, updateApiInfo } from "../../../apis";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IAddFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

interface IErrorResponseAddChannel {
  status: boolean;
  message: { [key: string]: string }[];
}

const AddForm = ({ step, setStep }: IAddFormProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [errorFetch, setErrorFetch] = useState<IErrorResponseAddChannel>({
    status: false,
    message: [],
  });
  const [inputData, setInputData] = useState<IChannelData>({
    apiId: "",
    apiHash: "",
  });
  const axiosPrivate = useApiPrivate();
  const navigate = useNavigate();
  const { controller, setSignal } = useAbortController(false);

  useEffect(() => {
    const getUserInfo = async () => {
      const { data } = await getProfile(axiosPrivate, controller);
      if (data?.api_id && data?.api_hash) {
        setStep(3);
      }
    };

    getUserInfo();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorFetch({
        ...errorFetch,
        status: false,
        message: [],
      });
      const { data } = await updateApiInfo(axiosPrivate, inputData, controller);
      setLoading(false);
      setInputData({ apiHash: "", apiId: "" });
      setStep(3);
      toast.success("اطلاعات با موفقیت ثبت شد!");
    } catch (error: any) {
      setLoading(false);
      if (error?.response?.status === 400) {
        setErrorFetch({
          ...errorFetch,
          status: true,
          message: error.response.data.message ?? "",
        });
      }
      if (error?.response?.status === 401) {
        navigate("login");
      }
    }
  };

  if (errorFetch.status) {
    for (const obj of errorFetch.message) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          toast.error(obj[key]);
        }
      }
    }

    setErrorFetch({
      message: [],
      status: false,
    });
  }

  return (
    <section>
      <form onSubmit={(e) => onSubmit(e)} className="p-4">
        <div className="form-control">
          <label htmlFor="apiHash" className="label">
            <span className="label-text">api_hash</span>
          </label>
          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-primary">
              <RiLockPasswordFill />
            </div>
            <input
              type="password"
              id="apiHash"
              name="apiHash"
              placeholder="api_hash"
              value={inputData.apiHash}
              onChange={(e) => onChange(e)}
              className="input-neutral-content input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
            />
          </div>
        </div>
        <div className="form-control">
          <div className="relative mb-6">
            <label htmlFor="apiId" className="label">
              <span className="label-text">api_id</span>
            </label>
            <div className="pointer-events-none absolute bottom-4 right-0 flex items-center pr-3 text-primary sm:bottom-4 lg:bottom-4">
              <RiLockPasswordFill />
            </div>

            <input
              type="password"
              id="apiId"
              name="apiId"
              value={inputData.apiId}
              onChange={(e) => onChange(e)}
              placeholder="api_id"
              className="input-neutral-content input w-full border border-primary border-opacity-20 p-2.5 pr-10 text-base-content focus:border-opacity-100 focus:text-base-content focus:outline-none sm:p-3 sm:pr-12 lg:p-2.5 lg:pr-10"
            />
          </div>
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setStep(1)}
            className="btn-outline btn-wide btn text-base focus:outline-base-content"
          >
            برگشت به صفحه قبل
          </button>
          <button
            className={`btn-secondary btn-outline btn-wide btn text-base focus:outline-secondary-focus ${
              loading ? "btn-disabled" : ""
            }`}
          >
            ثبت
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : null}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddForm;
