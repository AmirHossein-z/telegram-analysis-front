import { JSX, useContext, useEffect, useState } from "react";
import { getChannels, getTags } from "../../apis";
import { useAbortController, useApiPrivate } from "../../hooks";
import AuthContext from "../../context/auth-provider";
import { CardList, FilterInput, Pagination } from "../../components";
import { useSearchParams } from "react-router-dom";
import { IChannel } from "../../types";

interface ITags {
  tags: string;
  channelId: number;
}

// tagName filter in backend should be implemented
// G
const Tags = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const axiosPrivate = useApiPrivate();
  const { auth } = useContext(AuthContext);
  const { controller, setSignal } = useAbortController(false);
  const [tags, setTags] = useState<ITags[]>([]);
  const [searchParams, setSearchParams] = useSearchParams({});
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

  const fetchTags = async () => {
    try {
      setLoading(true);
      const { data } = await getTags(
        axiosPrivate,
        parseInt(auth.userId),
        controller
      );
      // console.log("data :>> ", data);
      setTags(data?.value);
      // setChannels(data.value?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();

    return () => {
      setLoading(false);
      setSignal(true);
    };
  }, []);

  const fetchChannels = async () => {
    try {
      setSearchParams({
        tagName: selectedTag,
        filter,
        page: pageInfo.currentPage.toString(),
      });
      // if (filter !== "0") {
      //   setSearchParams({
      //     filter: filter,
      //     page: pageInfo.currentPage.toString(),
      //   });
      // } else {
      //   setSearchParams({
      //     page: pageInfo.currentPage.toString(),
      //   });
      // }
      setLoading(true);
      const { data } = await getChannels(
        axiosPrivate,
        pageInfo.currentPage,
        parseInt(auth.userId),
        filter,
        selectedTag,
        controller
      );
      // console.log("data :>> ", data);
      setPageInfo({
        ...pageInfo,
        pageSize: data.value?.per_page,
        totalCount: data.value?.total,
        currentPage: data.value?.current_page,
      });
      setChannels(data.value?.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChannels();
  }, [selectedTag, pageInfo.currentPage]);

  if (loading) {
    return <p className="loading loading-spinner loading-lg"></p>;
  }

  if (tags.length > 0) {
    return (
      <section className="flex flex-col  gap-8">
        <div className="mx-auto w-full sm:max-w-lg lg:max-w-4xl">
          <ul className="grid snap-mandatory scroll-px-28 auto-cols-[22%] grid-flow-col gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain border-b border-b-base-300 border-opacity-50 text-secondary sm:auto-cols-[17%]">
            <li
              onClick={(e) => {
                setSelectedTag("");
                setSearchParams({
                  filter,
                  tagName: "",
                  page: pageInfo.currentPage.toString(),
                });
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
                    setSearchParams({
                      filter,
                      tagName: tagSelected,
                      page: pageInfo.currentPage.toString(),
                    });
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
        <CardList list={channels} />
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

/* {tags?.length > 0
                    ? tags.map((tag) => (
                          <li
                              onClick={(e) => {
                                  showRelatedTag(tag.id);
                                  e.target.scrollIntoView({
                                      behavior: "smooth",
                                      inline: "center",
                                      block: "start",
                                  });
                              }}
                              className={`snap-center py-4 px-2 grid items-center justify-center cursor-pointer rounded text-xs lg:text-sm active:bg-COLOR_GREEN active:bg-opacity-20 transition-all duration-200 ease-linear ${
                                  true === true
                                      ? "text-COLOR_RED_LIGHT font-bold scale-125"
                                      : "text-COLOR_BLUE_LIGHT"
                              }`}
                              key={tag.id}
                          >
                              {tag.text}
                          </li>
                      ))
                    : null}
                <li
                    className="active:bg-COLOR_GREEN active:bg-opacity-20 transition-all duration-200 ease-linear py-4 px-2 cursor-pointer grid items-center justify-center"
                    onClick={() => showRelatedTag("")}
                >
                    <BsArrowCounterclockwise className="w-5 h-5 text-COLOR_YELLOW cursor-pointer" />
                    {/* icon */
/* </li> */

export default Tags;
