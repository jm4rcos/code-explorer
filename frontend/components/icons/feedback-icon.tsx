interface Props {
  color?: string;
}

export const FeedbackIcon = ({ color = 'currentColor' }: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.67998 5.85841V11.1816L16.8 13.6692V3.37081L7.67998 5.85841ZM6.47998 11.1816C6.47993 11.4449 6.56648 11.7009 6.7263 11.9102C6.88612 12.1195 7.11034 12.2704 7.36438 12.3396L16.4844 14.8272C16.6625 14.8758 16.8494 14.8826 17.0306 14.8471C17.2118 14.8116 17.3824 14.7348 17.529 14.6226C17.6757 14.5105 17.7944 14.366 17.8761 14.2004C17.9578 14.0348 18.0002 13.8526 18 13.668V3.37081C18 3.18628 17.9575 3.00424 17.8757 2.83882C17.794 2.6734 17.6752 2.52906 17.5285 2.41703C17.3819 2.305 17.2114 2.2283 17.0303 2.19288C16.8492 2.15746 16.6624 2.16428 16.4844 2.21281L7.36438 4.70041C7.11034 4.76966 6.88612 4.92055 6.7263 5.12981C6.56648 5.33907 6.47993 5.59509 6.47998 5.85841V11.1816Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.14717 11.16H6.59997V5.87999H4.14357C3.52283 6.61984 3.18288 7.55489 3.18354 8.52065C3.1842 9.48641 3.52542 10.421 4.14717 11.16ZM6.59997 12.36C6.91823 12.36 7.22345 12.2336 7.4485 12.0085C7.67354 11.7835 7.79997 11.4783 7.79997 11.16V5.87999C7.79997 5.56173 7.67354 5.25651 7.4485 5.03146C7.22345 4.80642 6.91823 4.67999 6.59997 4.67999H3.90357C3.81373 4.67991 3.72481 4.69818 3.64228 4.73367C3.55974 4.76916 3.48532 4.82113 3.42357 4.88639C1.50117 6.91559 1.50957 10.11 3.42117 12.1488C3.48363 12.2151 3.55893 12.268 3.64247 12.3043C3.72602 12.3406 3.81608 12.3596 3.90717 12.36H6.59997Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.72279 13.044L5.71079 12.708L4.53719 17.4H7.70039L8.72279 13.044ZM5.84279 11.5164C5.55428 11.4841 5.26385 11.5576 5.02533 11.723C4.78681 11.8885 4.61637 12.1349 4.54559 12.4164L3.37319 17.1084C3.32886 17.2854 3.32546 17.4701 3.36323 17.6485C3.40101 17.827 3.47897 17.9945 3.59119 18.1383C3.70341 18.2821 3.84693 18.3984 4.01085 18.4784C4.17478 18.5584 4.35478 18.6 4.53719 18.6H7.70039C7.97115 18.6001 8.23399 18.5086 8.44618 18.3404C8.65838 18.1723 8.80745 17.9373 8.86919 17.6736L9.89159 13.3176C9.93049 13.1523 9.93384 12.9806 9.90143 12.8138C9.86902 12.6471 9.80158 12.4891 9.70357 12.3504C9.60557 12.2117 9.47923 12.0953 9.33291 12.0091C9.18659 11.9228 9.02362 11.8686 8.85479 11.85L5.84279 11.5164ZM22.3392 3.86762C22.4273 4.00003 22.4592 4.16201 22.4279 4.31794C22.3966 4.47388 22.3047 4.61101 22.1724 4.69922L20.3724 5.89922C20.3069 5.94565 20.2328 5.97847 20.1544 5.99573C20.076 6.01299 19.9949 6.01435 19.916 5.99972C19.8371 5.98509 19.7619 5.95477 19.6949 5.91055C19.6279 5.86634 19.5704 5.80913 19.5259 5.74231C19.4814 5.6755 19.4508 5.60043 19.4359 5.52156C19.4209 5.44269 19.4219 5.36163 19.4389 5.28316C19.4558 5.20469 19.4883 5.13042 19.5345 5.06475C19.5806 4.99907 19.6395 4.94333 19.7076 4.90082L21.5076 3.70082C21.64 3.61273 21.802 3.58081 21.9579 3.61209C22.1138 3.64337 22.251 3.73528 22.3392 3.86762ZM19.44 8.52002C19.44 8.36089 19.5032 8.20827 19.6157 8.09575C19.7282 7.98323 19.8809 7.92002 20.04 7.92002H21.84C21.9991 7.92002 22.1517 7.98323 22.2643 8.09575C22.3768 8.20827 22.44 8.36089 22.44 8.52002C22.44 8.67915 22.3768 8.83176 22.2643 8.94428C22.1517 9.0568 21.9991 9.12002 21.84 9.12002H20.04C19.8809 9.12002 19.7282 9.0568 19.6157 8.94428C19.5032 8.83176 19.44 8.67915 19.44 8.52002ZM19.5804 11.196C19.6312 11.1357 19.6934 11.086 19.7634 11.0497C19.8334 11.0134 19.9099 10.9913 19.9885 10.9847C20.067 10.978 20.1462 10.9868 20.2213 11.0107C20.2964 11.0347 20.3661 11.0731 20.4264 11.124L22.0824 12.5148C22.1976 12.619 22.2679 12.7639 22.2785 12.9189C22.2891 13.0738 22.2391 13.2269 22.1392 13.3458C22.0392 13.4647 21.897 13.5403 21.7425 13.5565C21.588 13.5727 21.4333 13.5284 21.3108 13.4328L19.6548 12.0408C19.533 11.9386 19.4567 11.7922 19.4428 11.6338C19.4288 11.4754 19.4783 11.3179 19.5804 11.196Z"
        fill={color}
      />
    </svg>
  );
};
