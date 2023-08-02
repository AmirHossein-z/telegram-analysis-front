import { Link } from "react-router-dom";

const CardTags = ({ tags }: { tags: string }): JSX.Element => {
  return (
    <div className="flex w-3/4 flex-wrap gap-1 text-secondary-focus md:w-full md:gap-3">
      {tags?.split(",").map((tag) => (
        <Link
          key={tag}
          to={`/dashboard/tags?tagName=${tag.substring(1)}`}
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
