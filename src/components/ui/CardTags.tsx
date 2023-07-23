import { Link } from "react-router-dom";

const CardTags = ({ tags }: { tags: string }): JSX.Element => {
  return (
    <div className="flex flex-wrap gap-1 text-warning md:gap-3 md:text-red-300">
      {tags?.split(",").map((tag) => (
        <Link
          key={tag}
          to={`/tags/${tag.substring(1)}`}
          className="text-xs sm:text-sm"
          style={{ direction: "ltr" }}
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default CardTags;
