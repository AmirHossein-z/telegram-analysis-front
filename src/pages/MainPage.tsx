import { FC } from "react";
import { Link } from "react-router-dom";

const MainPage: FC = () => {
  return (
    <main
      className="grid aspect-square h-screen w-screen items-center bg-cover bg-center"
      style={{ backgroundImage: "url(/src/assets/bg_tablet.jpg)" }}
    >
      <h2 className="justify-self-center text-3xl text-primary md:text-4xl">
        تحلیل تلگرام
      </h2>
      <div className="flex items-center justify-center gap-4 self-baseline p-2">
        <Link to="/register">
          <button className="btn-warning btn rounded-lg">ثبت نام</button>
        </Link>
        <Link to="/login">
          <button className="btn-secondary btn rounded-lg">ورود</button>
        </Link>
      </div>
    </main>
  );
};

export default MainPage;
