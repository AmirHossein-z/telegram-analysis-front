import { JSX, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";
import { useAbortController, useApiPrivate } from "../../../hooks";
import { getPost } from "../../../apis";
import { IPost } from "../../../types";
import { StatContainer } from "../../../containers";
import { CardTags, Stat } from "../../../components";
import { AiFillEye } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { formatNumber, getJalaliDate, getRelativeDate } from "../../../utils";

// enum postType {
//   text = "متنی",
// }

const ViewPost = (): JSX.Element => {
  const { postId = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const axiosPrivate = useApiPrivate();
  const { controller, setSignal } = useAbortController(false);
  const [post, setPost] = useState<IPost>({
    channel_id: 0,
    created_at: "",
    details: "",
    id: 0,
    share: 0,
    tags: "",
    type: 0,
    updated_at: "",
    view: 0,
  });

  const getPostById = async () => {
    try {
      setLoading(true);
      const { data } = await getPost(axiosPrivate, postId, controller);
      console.log("data :>> ", data);
      setPost(data.value[0]);
      setLoading(false);
    } catch (err: any) {
      // post nadasht yani momke karbar dasti url zade bashe bas redirect beshe be posts ha
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostById();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  } else if (post?.id === 0) {
    return (
      <button className="btn-secondary btn" onClick={getPostById}>
        لود دوباره
      </button>
    );
  }

  return (
    <IconContext.Provider value={{ size: "23px" }}>
      <StatContainer>
        <Stat
          title="تعداد کل بازدیدها"
          value={formatNumber(post.view)}
          icon={<AiFillEye />}
        />
        <Stat
          title="تعداد کل اشتراک‌ها"
          value={formatNumber(post.share)}
          icon={<BsFillShareFill />}
        />
        <Stat
          title="تاریخ انتشار"
          value={getJalaliDate(post.created_at)}
          icon={<FaBirthdayCake />}
          moreInfo={getRelativeDate(post.created_at)}
        />
        {post?.updated_at && (
          <Stat
            title="تاریخ آخرین ویرایش"
            value={getJalaliDate(post.updated_at)}
            icon={<FaUserAlt />}
            moreInfo={getRelativeDate(post.updated_at)}
          />
        )}
      </StatContainer>
      <section className="">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-base-content-100 text-justify text-sm font-normal">
              {post.details}
            </p>
            {/* {name?.length && name.length > 90 ? ( <h2 className="card-body text-justify font-normal">
            {name.trim().substring(0, 90)}...
          </h2>
        ) : (
          <h2 className="card-title text-base font-normal">{name?.trim()}</h2>
        )} */}
          </div>
          <CardTags tags={post.tags} />
        </div>
      </section>
    </IconContext.Provider>
  );
};

export default ViewPost;
