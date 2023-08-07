import { JSX, useEffect, useState } from "react";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";
import { useAxiosPrivate } from "../../../hooks";
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
  const { loading, response, error } = useAxiosPrivate(getPost(postId));

  useEffect(() => {
    if (response !== null) {
      setPost(response.value[0]);
    }
  }, [response]);

  if (loading) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت پست
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <p>مشکلی پیش آمده است</p>
      </section>
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
          </div>
          <CardTags tags={post.tags} />
        </div>
      </section>
    </IconContext.Provider>
  );
};

export default ViewPost;
