import { JSX } from "react";
import { useParams } from "react-router-dom";

const ViewChannel = (): JSX.Element => {
  const { channelId } = useParams();
  console.log("channelId :>> ", channelId);

  return <div>view channel</div>;
};

export default ViewChannel;
