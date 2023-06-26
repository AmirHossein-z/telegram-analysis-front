import { FC, ReactNode } from "react";

enum ButtonSize {
  small = "px-3 py-2 text-sm text-center",
  normal = "text-sm px-5 py-2.5 text-center",
  large = "px-5 py-3 text-base text-center",
}

enum ButtonType {
  primary = "text-gray_bright bg-yellow_bright hover:bg-orange_bright",
  secondary = "text-blue_dark bg-blue_light hover:bg-blue_dark hover:text-blue_lighter",
  primaryOutline = "border border-yellow_bright text-yellow_bright hover:bg-yellow_bright hover:text-gray_bright",
  secondaryOutline = "",
}

interface Props {
  variant: "base" | "pill" | "outline";
  children: ReactNode;
  type: "button" | "submit" | "reset";
  size: keyof typeof ButtonSize;
  btnType: keyof typeof ButtonType;
}

const Button: FC<Props> = (props) => {
  const { variant, children, type = "button", size = "small", btnType } = props;

  switch (variant) {
    case "base":
      return (
        <button
          type={type}
          className={`${ButtonSize[size]} ${ButtonType[btnType]} rounded-lg font-medium transition-all duration-300 ease-in-out focus:outline-none`}
        >
          {children}
        </button>
      );
      break;

    case "pill":
      return (
        <button
          type={type}
          className={`${ButtonSize[size]} ${ButtonType[btnType]} rounded-full font-medium transition-all duration-300 ease-in-out focus:outline-none`}
        >
          {children}
        </button>
      );
      break;
    case "outline":
      if (btnType === "primary") {
        return (
          <button
            type={type}
            className={`${ButtonSize[size]} ${ButtonType["primaryOutline"]} border- rounded-lg border font-medium transition-all duration-300 ease-in-out focus:outline-none`}
          >
            {children}
          </button>
        );
      } else if (btnType === "secondary") {
        return (
          <button
            type={type}
            className={`${ButtonSize[size]} ${ButtonType["secondaryOutline"]} border- rounded-lg border font-medium transition-all duration-300 ease-in-out focus:outline-none`}
          >
            {children}
          </button>
        );
      }
    default:
      return (
        <button type={type} className="">
          button
        </button>
      );
      break;
  }
};

export default Button;
