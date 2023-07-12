import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { RiLockPasswordFill } from "react-icons/ri";

interface IAddFormProps {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

interface IChannelData {
  apiId: string;
  apiHash: string;
}

const AddForm = ({ step, setStep }: IAddFormProps): JSX.Element => {
  const [loading] = useState(false);
  const [inputData, setInputData] = useState<IChannelData>({
    apiId: "",
    apiHash: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
  };
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
