type IconProps = {
  height: string;
  width: string;
};
export function MaterialSymbolsAccountBalance({ height, width }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5 17v-7h2v7Zm6 0v-7h2v7Zm-9 4v-2h20v2Zm15-4v-7h2v7ZM2 8V6l10-5l10 5v2Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsLogout({ height, width }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h7v2Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsEdit({ height, width }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m19.3 8.925l-4.25-4.2l1.4-1.4q.575-.575 1.413-.575q.837 0 1.412.575l1.4 1.4q.575.575.6 1.388q.025.812-.55 1.387ZM17.85 10.4L7.25 21H3v-4.25l10.6-10.6Z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDelete({ height, width }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={width}
      height={height}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21Zm2-4h2V8H9Zm4 0h2V8h-2Z"
      ></path>
    </svg>
  );
}
