import { Tooltip } from "@material-tailwind/react";

export function TooltipComponent(props) {
  const { content } = props;
  return (
    <Tooltip
      placement="right"
      className="bg-whiten px-4 py-3 text-[#376eab] rounded-md w-[200px]"
      content={content}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        fill="transparent"
        strokeWidth={2}
        className="h-5 w-5 cursor-pointer text-blue-gray-500 inline-block"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
        />
      </svg>
    </Tooltip>
  );
}
