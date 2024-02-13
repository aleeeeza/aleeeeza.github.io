import { LOCALE } from "@config";

export interface Props {
  datetime: string | Date;
  size?: "sm" | "lg";
  className?: string;
}

export default function Datetime({ datetime, size = "sm", className }: Props) {
  return (
    <div className={`flex items-center opacity-80 ${className}`}>
      <span className="sr-only">Posted on:</span>
      <span
        className={`${
          size === "sm" ? "text-sm" : "text-base"
        } rounded-full border px-4 py-1`}
      >
        <FormattedDatetime datetime={datetime} />
      </span>
    </div>
  );
}

const FormattedDatetime = ({ datetime }: { datetime: string | Date }) => {
  const myDatetime = new Date(datetime);

  // const date = myDatetime.toLocaleDateString(LOCALE, {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });

  const year = myDatetime.toLocaleString("default", { year: "numeric" });
  const month = myDatetime.toLocaleString("default", { month: "2-digit" });
  const day = myDatetime.toLocaleString("default", { day: "2-digit" });
  const date = [year, month, day].join("-");

  return <>{date}</>;
};
