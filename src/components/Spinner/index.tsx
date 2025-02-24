import classNames from "classnames";

const Spinner = ({ type = "local" }: { type: "global" | "local" }) => {
  if (type === "global") {
    return (
      <div>
        <div
          className={classNames(
            "fixed inset-0 z-50 w-screen h-screen flex justify-center items-center",
            "bg-white bg-opacity-50 backdrop-blur"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className={classNames(
              "h-20 w-20 rounded-full border-4 border-t-4 border-gray-200",
              "border-t-black animate-spin"
            )}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "h-12 w-12 rounded-full border-4 border-t-4 border-gray-200",
        "border-t-black animate-spin"
      )}
    />
  );
};

export default Spinner;
