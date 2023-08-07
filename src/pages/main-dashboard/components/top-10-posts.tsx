// f"""SELECT * FROM {Tabel_Posts} where Channel_Id = %s order by share Desc Limit 10;"""

import { useEffect, useState, JSX } from "react";
import { getTop10 } from "../../../apis";
import { useAxiosPrivate } from "../../../hooks";
import { IPost } from "../../../types";
import { CardList } from "../../../components";

interface ITop {
  view: IPost[];
  share: IPost[];
}

const Top10Posts = ({ channelId }: { channelId: number }): JSX.Element => {
  const [selectTop10, setSelectTop10] = useState(false);
  const [top, setTop] = useState<ITop>({ view: [], share: [] });
  const {
    loading,
    response,
    error,
    fetchData: fetchTop10,
  } = useAxiosPrivate(getTop10(channelId));

  useEffect(() => {
    if (response !== null) {
      setTop({ view: response?.value?.view, share: response?.value?.share });
    }
  }, [response]);

  useEffect(() => {
    fetchTop10();
  }, [channelId]);

  if (loading) {
    return (
      <section className="mt-8 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت برترین پست‌ها
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-8 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت برترین پست‌ها
      </section>
    );
  }

  return (
    <>
      <div className="my-8 flex items-center justify-center gap-6">
        <div className="form-control">
          <label className="label cursor-pointer" style={{ direction: "ltr" }}>
            <span className="label-text text-lg">۱۰ پست پر بازدید</span>
            <input
              type="radio"
              name="radio-10"
              onChange={() => setSelectTop10(false)}
              className="radio mx-2 checked:bg-red-500"
              checked={selectTop10 === false}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer" style={{ direction: "ltr" }}>
            <span className="label-text text-lg">۱۰ پست پر اشتراک</span>
            <input
              type="radio"
              name="radio-10"
              onChange={() => setSelectTop10(true)}
              className="radio mx-2 checked:bg-blue-500"
              checked={selectTop10 === true}
            />
          </label>
        </div>
      </div>
      {selectTop10 && <CardList list={top.share} />}
      {!selectTop10 && <CardList list={top.view} />}
    </>
  );
};

export default Top10Posts;
