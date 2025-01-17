export function Logo(props: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="131"
      height="40"
      fill="none"
      viewBox="0 0 131 40"
      {...props}
    >
      <path
        fill="#2563EB"
        fillRule="evenodd"
        d="M0 20c0 11.046 8.954 20 20 20s20-8.954 20-20S31.046 0 20 0 0 8.954 0 20zm20 16c-7.264 0-13.321-5.163-14.704-12.02C4.97 22.358 6.343 21 8 21h24c1.657 0 3.031 1.357 2.704 2.98C33.32 30.838 27.264 36 20 36z"
        clipRule="evenodd"
      ></path>
      <text
        x="42"
        y="30"
        font-size="20"
        font-family="Arial, sans-serif"
        fill="black"
        stroke="black"
        stroke-width="1"
      >
        Letsrun
      </text>
      <text
        x="110"
        y="30"
        font-size="20"
        font-family="Arial, sans-serif"
        fill="#2563EB"
        stroke="#2563EB"
        stroke-width="1"
      >
        AI
      </text>
    </svg>
  )
}
