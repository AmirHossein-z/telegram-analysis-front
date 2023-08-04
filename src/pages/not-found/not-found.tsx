import { JSX } from "react";
import { Link } from "react-router-dom";

const NotFound = (): JSX.Element => {
  return (
    <>
      <section className="z-10 h-screen overflow-hidden bg-secondary bg-opacity-50 py-[120px]">
        <div className="container">
          <div className="-mx-4 flex">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[400px] text-center">
                <h2 className="mb-2 text-[50px] font-bold leading-none text-secondary sm:text-[80px] md:text-[100px]">
                  ۴۰۴
                </h2>
                <h4 className="mb-3 text-[22px] font-semibold leading-tight text-secondary">
                  صفحه مورد نظر پیدا نشد!
                </h4>
                <Link
                  to={"/"}
                  className="inline-block rounded-lg border border-secondary px-8 py-3 text-center text-base font-semibold text-secondary transition"
                >
                  برگشت به صفحه اصلی
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
