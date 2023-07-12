import { Dispatch, SetStateAction } from "react";

interface IManualChannelProps {
  setStep: Dispatch<SetStateAction<number>>;
}

const ManualChannel = ({ setStep }: IManualChannelProps) => {
  return (
    <section className="flex flex-col">
      <div className="flex flex-col justify-start gap-5">
        <h1 className="text-warning">هشدار</h1>
        <p>برای گرفتن اطلاعات کانال تلگرام به دو کد نیاز دارید:</p>
        <ul className="list-disc">
          <li className="">api_hash</li>
          <li className="">api_id</li>
        </ul>
        <p>دادن این کدها به منزله دسترسی کامل به اکانت شما است!</p>
        <a
          href="https://core.telegram.org/api/obtaining_api_id"
          target="_blank"
          referrerPolicy="no-referrer"
          className="link-secondary link flex items-center gap-2"
        >
          سایت رسمی تلگرام
        </a>
        <a
          href="https://virgool.io/@hossein_derikvand/%D8%AF%D8%B1%DB%8C%D8%A7%D9%81%D8%AA-api-id-%D9%88-api-hash-%D8%AA%D9%84%DA%AF%D8%B1%D8%A7%D9%85-swmov50ojtii"
          target="_blank"
          referrerPolicy="no-referrer"
          className="link-secondary link"
        >
          آموزش فارسی
        </a>
      </div>
      <button
        onClick={() => setStep(2)}
        className="btn-success btn-outline btn-wide btn self-end text-base focus:outline-secondary-focus"
      >
        ثبت اطلاعات
      </button>
    </section>
  );
};

export default ManualChannel;
