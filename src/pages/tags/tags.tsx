import { JSX, useContext, useEffect, useState } from "react";
import { getChannels, getTags } from "../../apis";
import { useAxiosPrivate } from "../../hooks";
import AuthContext from "../../context/auth-provider";
import { CardList, FilterInput, Pagination } from "../../components";
import { useSearchParams } from "react-router-dom";
import { IChannel } from "../../types";

interface ITags {
  tags: string;
  channelId: number;
}

const Tags = (): JSX.Element => {
  const { auth } = useContext(AuthContext);
  const { loading: loadingTags, response: responseTags } = useAxiosPrivate(
    getTags(parseInt(auth.userId))
  );
  const [tags, setTags] = useState<ITags[]>([]);
  const [searchParams] = useSearchParams({});
  const [selectedTag, setSelectedTag] = useState(
    searchParams.get("tagName") ?? ""
  );
  const [pageInfo, setPageInfo] = useState({
    pageSize: 0,
    totalCount: 0,
    currentPage: parseInt(searchParams.get("page") ?? "", 10) || 1,
  });
  const [filter, setFilter] = useState(searchParams.get("filter") ?? "");
  const [channels, setChannels] = useState<IChannel[]>([]);
  const {
    loading: loadingChannels,
    error: errorChannels,
    response: responseChannels,
    fetchData: fetchChannels,
  } = useAxiosPrivate({
    ...getChannels(
      pageInfo.currentPage,
      parseInt(auth.userId, 10),
      filter,
      selectedTag
    ),
    runOnMount: false,
  });

  useEffect(() => {
    if (responseTags !== null) {
      setTags(responseTags?.value);
    }
  }, [responseTags]);

  useEffect(() => {
    document.documentElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    fetchChannels();
  }, [selectedTag, pageInfo.currentPage]);

  useEffect(() => {
    if (responseChannels !== null) {
      setChannels(responseChannels?.value?.data);
      setPageInfo({
        ...pageInfo,
        pageSize: responseChannels.value?.per_page,
        totalCount: responseChannels.value?.total,
        currentPage: responseChannels.value?.current_page,
      });
    }
  }, [responseChannels]);

  if (loadingTags) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت تگ‌ها
      </section>
    );
  }

  if (errorChannels) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <p>مشکلی پیش آمده است</p>
      </section>
    );
  }

  if (tags.length > 0) {
    return (
      <section className="flex flex-col  gap-8">
        <div className="mx-auto w-full sm:max-w-lg lg:max-w-4xl">
          <ul className="grid snap-mandatory scroll-px-28 auto-cols-[22%] grid-flow-col gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain border-b border-b-base-300 border-opacity-50 text-secondary sm:auto-cols-[17%]">
            <li
              onClick={(e) => {
                setSelectedTag("");
                (e.target as HTMLLinkElement).scrollIntoView({
                  behavior: "smooth",
                  inline: "center",
                  block: "start",
                });
              }}
              style={{ direction: "ltr" }}
              className={`lg:text-semibold grid cursor-pointer snap-center items-center justify-center rounded px-2 py-4 text-sm font-normal transition-all duration-200 ease-linear active:text-error ${
                selectedTag === "" ? "font-semibold text-red-400" : ""
              }`}
            >
              هیچ کدام
            </li>
            {tags
              ?.map((tag) => tag.tags.split(","))
              .flat(1)
              .filter((t) => t.length > 0)
              .map((t) => (
                <li
                  onClick={(e) => {
                    const tagSelected = t.replace("#", "");
                    setSelectedTag(tagSelected);
                    (e.target as HTMLLinkElement).scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "start",
                    });
                  }}
                  key={t}
                  style={{ direction: "ltr" }}
                  className={`lg:text-semibold grid cursor-pointer snap-center items-center justify-center rounded px-2 py-4 text-sm font-normal transition-all duration-200 ease-linear active:text-error ${
                    selectedTag === t.replace("#", "")
                      ? "font-semibold text-red-400"
                      : ""
                  }`}
                >
                  {t}
                </li>
              ))}
          </ul>
        </div>
        <FilterInput
          filter={filter}
          setFilter={setFilter}
          getInfo={fetchChannels}
        />
        {loadingChannels ? (
          <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
            <span className="loading loading-dots loading-lg text-primary"></span>
            در حال دریافت کانال‌ها
          </section>
        ) : (
          <CardList list={channels} />
        )}
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
    );
  }
  return <div>تگی وجود ندارد</div>;
};

export default Tags;
