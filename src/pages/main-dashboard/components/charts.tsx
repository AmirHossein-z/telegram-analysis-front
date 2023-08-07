import { useEffect, useState } from "react";
import { useAxiosPrivate } from "../../../hooks";
import { IPost } from "../../../types";
import { getPostsStat } from "../../../apis";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: false,
    },
  },
  scales: {
    y: {
      type: "linear" as const,
      display: true,
      position: "left" as const,
    },
    y1: {
      type: "linear" as const,
      display: true,
      position: "right" as const,
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

interface IData {
  view: IPost[];
  share: IPost[];
  created_at: { id: number; created_at: string }[];
}

const Charts = ({ channelId }: { channelId: number }) => {
  const [data, setData] = useState<IData>({
    view: [],
    share: [],
    created_at: [],
  });
  const {
    loading,
    response,
    error,
    fetchData: fetchStat,
  } = useAxiosPrivate(getPostsStat(channelId));
  const chartsData = aggregateViewShare(data);
  const dateData = aggregateDate(data);

  useEffect(() => {
    if (response !== null) {
      setData({
        view: response?.value?.view,
        share: response?.value?.share,
        created_at: response?.value?.date,
      });
    }
  }, [response]);

  useEffect(() => {
    fetchStat();
  }, [channelId]);

  const viewData = {
    labels: chartsData.view.map((item) => item.date),
    datasets: [
      {
        label: "نمودار view بر حسب ماه - سال",
        data: chartsData.view.map((obj) => obj.count),
        fill: false,
        tension: 0.1,
        borderColor: "rgb(255, 99, 132)",
        // borderColor:"#ef4444"
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const shareData = {
    labels: chartsData.share.map((item) => item.date),
    datasets: [
      {
        label: "نمودار share بر حسب ماه - سال",
        data: chartsData.share.map((item) => item.count),
        fill: false,
        // borderColor: "rgb(75, 192, 192)",
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        tension: 0.1,
      },
    ],
  };

  const datesData = {
    labels: dateData.map((item) => item.date),
    datasets: [
      {
        label: "نمودار تعداد پست منتشر شده بر حسب ماه - سال",
        data: dateData.map((item) => item.count),
        fill: false,
        borderColor: "rgba(124, 17, 88)",
        backgroundColor: "rgba(124, 17, 88,0.5)",
        tension: 0.1,
      },
    ],
  };

  if (loading) {
    return (
      <section className="mt-20 flex flex-col items-center justify-center gap-1 font-semibold text-primary-focus">
        <span className="loading loading-dots loading-lg text-primary"></span>
        در حال دریافت اطلاعات نمودارها
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
    <div className="flex flex-col gap-10">
      <Line options={options} data={viewData} />
      <Line options={options} data={shareData} />
      <Line options={options} data={datesData} />
    </div>
  );
};

const aggregateViewShare = (data: IData) => {
  const result: {
    view: { date: string; count: number }[];
    share: { date: string; count: number }[];
  } = {
    view: [{ date: "", count: 0 }],
    share: [{ date: "", count: 0 }],
  };

  Object.keys(data).forEach((key) => {
    if (key === "view" || key === "share") {
      data[key].forEach((item) => {
        const month = dayjs(item.created_at)
          .calendar("jalali")
          .locale("fa")
          .format("MMMM - YYYY");
        const index = result[key].findIndex((x) => x.date === month);
        if (index === -1) {
          result[key].push({ date: month, count: item[key] });
        } else {
          result[key][index].count += item[key];
        }
      });
    }
  });
  return result;
};

const aggregateDate = (data: IData) => {
  const counts: { [key: string]: number } = {};

  data.created_at.forEach((date) => {
    const month = dayjs(date.created_at).format("MMMM - YYYY");
    counts[month] = (counts[month] || 0) + 1;
  });

  const result = Object.keys(counts).map((month) => ({
    date: month,
    count: counts[month].toString(),
  }));

  return result;
};

export default Charts;
