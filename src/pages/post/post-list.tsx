import { useParams, useSearchParams } from "react-router-dom";
import { useAxiosPrivate } from "../../hooks";
import { useEffect, useState } from "react";
import { getPosts } from "../../apis";
import { CardList, FilterInput, Pagination } from "../../components";
import { IPost } from "../../types";

const PostList = (): JSX.Element => {
  const { channelId = "" } = useParams();
  const [posts, setPosts] = useState<IPost[]>([]);
  const [searchParams] = useSearchParams({});
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });
  const {
    response,
    loading,
    fetchData: getPostsByChannelId,
    error,
  } = useAxiosPrivate(getPosts(channelId, pageInfo.currentPage, filter));

  useEffect(() => {
    if (response !== null) {
      setPosts(response?.value?.data);
      setPageInfo({
        ...pageInfo,
        pageSize: response.value?.per_page,
        totalCount: response.value?.total,
        currentPage: response.value?.current_page,
      });
    }
  }, [response]);

  useEffect(() => {
    getPostsByChannelId();

    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }, [pageInfo.currentPage]);

  if (loading) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت پست‌ها
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
    <>
      <section className="mb-5">
        <FilterInput
          getInfo={getPostsByChannelId}
          filter={filter}
          setFilter={setFilter}
        />
      </section>
      <section className="mb-5 flex flex-col gap-10">
        <a className="text-2xl font-semibold text-primary">لیست پست ها</a>
        <CardList list={posts} />
        <Pagination
          currentPage={pageInfo.currentPage}
          totalCount={pageInfo.totalCount}
          pageSize={pageInfo.pageSize}
          siblingCount={1}
          onPageChange={(page: number) =>
            setPageInfo({ ...pageInfo, currentPage: page })
          }
        />
      </section>
    </>
  );
};

export default PostList;
