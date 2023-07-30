import { JSX } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <>
      <section className="z-10 h-screen overflow-hidden bg-primary py-[120px]">
        <div className="container">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-white sm:text-[80px] md:text-[100px]">
                  ۴۰۴
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-white">
                  صفحه مورد نظر پیدا نشد!
                </h4>
                <button
                  onClick={() => navigate("/")}
                  className="inline-block rounded-lg border border-white px-8 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary"
                >
                  برگشت به صفحه اصلی
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
