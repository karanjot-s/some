import React from "react";

const BellIcon = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M54.9844 51H13.0156C12.6432 50.9987 12.2777 50.8996 11.9557 50.7125C11.6337 50.5255 11.3665 50.2571 11.1809 49.9343C10.9953 49.6115 10.8978 49.2455 10.8981 48.8731C10.8984 48.5008 10.9966 48.135 11.1828 47.8125C12.9359 44.7844 14.9281 39.2594 14.9281 29.75C14.9281 27.2455 15.4214 24.7654 16.3799 22.4515C17.3383 20.1376 18.7432 18.0351 20.5141 16.2642C22.2851 14.4932 24.3876 13.0883 26.7015 12.1299C29.0154 11.1714 31.4954 10.6781 34 10.6781C36.5045 10.6781 38.9846 11.1714 41.2985 12.1299C43.6124 13.0883 45.7149 14.4932 47.4858 16.2642C49.2568 18.0351 50.6617 20.1376 51.6201 22.4515C52.5786 24.7654 53.0719 27.2455 53.0719 29.75C53.0719 39.2594 55.0641 44.7844 56.8172 47.8125C57.0034 48.135 57.1015 48.5008 57.1019 48.8731C57.1022 49.2455 57.0047 49.6115 56.8191 49.9343C56.6334 50.2571 56.3662 50.5255 56.0442 50.7125C55.7222 50.8996 55.3567 50.9987 54.9844 51Z"
        // fill={color}
      />
      <path
        d="M55.1969 29.75C55.2181 24.1444 53.0152 18.7593 49.0714 14.7756C45.1276 10.792 39.7649 8.53511 34.1594 8.49999H34C31.2129 8.50347 28.4538 9.05589 25.8802 10.1257C23.3065 11.1955 20.9688 12.7617 19.0005 14.735C17.0322 16.7082 15.4718 19.0498 14.4085 21.6261C13.3451 24.2024 12.7996 26.9629 12.8031 29.75C12.8031 38.8609 10.9172 44.014 9.35 46.7234C8.97318 47.3721 8.77249 48.108 8.76783 48.8582C8.76317 49.6083 8.95471 50.3467 9.32344 51C9.69534 51.6496 10.2332 52.1887 10.882 52.5621C11.5307 52.9355 12.2671 53.1298 13.0156 53.125H23.375C23.375 55.9429 24.4944 58.6454 26.487 60.638C28.4796 62.6306 31.1821 63.75 34 63.75C36.8179 63.75 39.5204 62.6306 41.513 60.638C43.5056 58.6454 44.625 55.9429 44.625 53.125H54.9844C55.7329 53.1298 56.4693 52.9355 57.118 52.5621C57.7668 52.1887 58.3047 51.6496 58.6766 51C59.0453 50.3467 59.2368 49.6083 59.2322 48.8582C59.2275 48.108 59.0268 47.3721 58.65 46.7234C57.0828 44.014 55.1969 38.8609 55.1969 29.75ZM34 59.5C32.3114 59.493 30.6939 58.8191 29.4999 57.6251C28.3059 56.431 27.632 54.8136 27.625 53.125H40.375C40.368 54.8136 39.6941 56.431 38.5001 57.6251C37.306 58.8191 35.6886 59.493 34 59.5ZM13.0156 48.875C14.8484 45.714 17.0531 39.8172 17.0531 29.75C17.0461 27.52 17.4793 25.3106 18.3278 23.2484C19.1764 21.1862 20.4236 19.3117 21.9979 17.7324C23.5723 16.1531 25.4429 14.9 27.5024 14.0451C29.562 13.1901 31.77 12.75 34 12.75H34.1328C36.3502 12.7552 38.5445 13.2019 40.5875 14.0638C42.6306 14.9257 44.4817 16.1857 46.0328 17.7703C47.5995 19.3459 48.8399 21.215 49.6831 23.2707C50.5264 25.3263 50.9558 27.5281 50.9469 29.75C50.9469 39.8172 53.1516 45.714 54.9844 48.875H13.0156ZM59.7391 19.4703C59.4459 19.6008 59.1301 19.673 58.8094 19.6828C58.4099 19.6863 58.0177 19.5757 57.6789 19.3639C57.3401 19.1522 57.0688 18.8481 56.8969 18.4875C54.799 14.2663 51.5834 10.7016 47.6 8.18124C47.3628 8.03299 47.1571 7.83947 46.9947 7.61173C46.8323 7.38399 46.7163 7.1265 46.6534 6.85394C46.5905 6.58139 46.5819 6.29911 46.6281 6.02324C46.6743 5.74736 46.7744 5.48328 46.9227 5.24608C47.0709 5.00888 47.2644 4.8032 47.4922 4.64079C47.7199 4.47838 47.9774 4.36242 48.2499 4.29952C48.5225 4.23662 48.8048 4.22802 49.0807 4.27422C49.3565 4.32041 49.6206 4.42049 49.8578 4.56874C54.5199 7.50439 58.2725 11.6801 60.6953 16.6281C60.9442 17.132 60.9832 17.714 60.804 18.2467C60.6248 18.7793 60.2419 19.2193 59.7391 19.4703ZM9.19062 19.6828C8.86987 19.673 8.55409 19.6008 8.26094 19.4703C7.7581 19.2193 7.37518 18.7793 7.19596 18.2467C7.01675 17.714 7.05584 17.132 7.30469 16.6281C9.7275 11.6801 13.4801 7.50439 18.1422 4.56874C18.6212 4.26933 19.1996 4.17249 19.75 4.29952C20.0226 4.36242 20.2801 4.47838 20.5078 4.64079C20.7356 4.8032 20.9291 5.00888 21.0773 5.24608C21.2256 5.48328 21.3257 5.74736 21.3719 6.02324C21.4181 6.29911 21.4095 6.58139 21.3466 6.85394C21.2837 7.1265 21.1677 7.38399 21.0053 7.61173C20.8429 7.83947 20.6372 8.03299 20.4 8.18124C16.4166 10.7016 13.201 14.2663 11.1031 18.4875C10.9312 18.8481 10.6599 19.1522 10.3211 19.3639C9.98232 19.5757 9.59012 19.6863 9.19062 19.6828Z"
        // fill={color}
      />
    </svg>
  );
};

BellIcon.defaultProps = { className: "", color: "#94A3B8" };

export default BellIcon;