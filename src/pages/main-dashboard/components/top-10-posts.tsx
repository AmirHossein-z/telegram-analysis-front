// f"""SELECT * FROM {Tabel_Posts} where Channel_Id = %s order by share Desc Limit 10;"""

import { useEffect, useState, JSX } from "react";
import { getTop10 } from "../../../apis";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { IPost } from "../../../types";
import { CardList } from "../../../components";

interface ITop {
  view: IPost[];
  share: IPost[];
}

const Top10Posts = ({ channelId }: { channelId: number }): JSX.Element => {
  const [selectTop10, setSelectTop10] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useApiPrivate();
  const { controller, setSignal } = useAbortController(false);
  const [top, setTop] = useState<ITop>({ view: [], share: [] });

  const fetchTop10 = async () => {
    try {
      setLoading(true);
      const { data } = await getTop10(axiosPrivate, channelId, controller);
      setTop({ view: data?.value?.view, share: data?.value?.share });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTop10();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  useEffect(() => {
    fetchTop10();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, [channelId]);

  return (
    <>
      <div className="my-3 flex items-center justify-center gap-6">
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
