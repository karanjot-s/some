import React from "react";
const LogoIcon = ({ className, color }) => {
  return (
    <svg
      className={className}
      width="76"
      height="76"
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.2"
        d="M64.125 14.3391V30.875C64.125 51.8641 52.4281 68.875 38 68.875C23.5719 68.875 11.875 51.8641 11.875 30.875V14.3391C11.8705 13.9517 11.962 13.5693 12.1414 13.2259C12.3207 12.8825 12.5823 12.5889 12.9028 12.3713C13.2233 12.1538 13.5927 12.019 13.9781 11.979C14.3634 11.939 14.7526 11.995 15.1109 12.1422C19.5938 13.8641 28.2328 16.625 38 16.625C47.7672 16.625 56.4063 13.8641 60.8891 12.1422C61.2474 11.995 61.6366 11.939 62.022 11.979C62.4073 12.019 62.7767 12.1538 63.0972 12.3713C63.4177 12.5889 63.6793 12.8825 63.8587 13.2259C64.038 13.5693 64.1295 13.9517 64.125 14.3391Z"
        fill={color}
      />
      <path
        d="M55.7531 36.4266C55.9618 36.6585 56.1227 36.9293 56.2266 37.2234C56.3306 37.5176 56.3756 37.8293 56.359 38.1408C56.3425 38.4524 56.2647 38.7576 56.1302 39.039C55.9957 39.3205 55.807 39.5727 55.575 39.7813C55.1391 40.1621 54.5804 40.3729 54.0016 40.375C53.6648 40.3753 53.3318 40.304 53.0247 40.1658C52.7176 40.0276 52.4434 39.8257 52.2203 39.5735C51.7749 39.0778 51.2301 38.6815 50.6215 38.4102C50.0128 38.1388 49.3539 37.9986 48.6875 37.9986C48.0211 37.9986 47.3622 38.1388 46.7535 38.4102C46.1449 38.6815 45.6001 39.0778 45.1547 39.5735C44.9482 39.8076 44.6976 39.9987 44.4171 40.1358C44.1367 40.273 43.832 40.3535 43.5204 40.3728C43.2089 40.3921 42.8965 40.3498 42.6013 40.2483C42.3061 40.1468 42.0338 39.9881 41.8 39.7813C41.568 39.5727 41.3793 39.3205 41.2448 39.039C41.1103 38.7576 41.0325 38.4524 41.016 38.1408C40.9994 37.8293 41.0444 37.5176 41.1484 37.2234C41.2523 36.9293 41.4132 36.6585 41.6219 36.4266C42.5077 35.427 43.5955 34.6267 44.8135 34.0786C46.0315 33.5305 47.3519 33.2471 48.6875 33.2471C50.0231 33.2471 51.3435 33.5305 52.5615 34.0786C53.7795 34.6267 54.8673 35.427 55.7531 36.4266ZM30.8453 39.5735C31.0684 39.8257 31.3426 40.0276 31.6497 40.1658C31.9568 40.304 32.2898 40.3753 32.6266 40.375C33.2054 40.3729 33.7641 40.1621 34.2 39.7813C34.432 39.5727 34.6207 39.3205 34.7552 39.039C34.8897 38.7576 34.9675 38.4524 34.984 38.1408C35.0006 37.8293 34.9556 37.5176 34.8516 37.2234C34.7477 36.9293 34.5868 36.6585 34.3781 36.4266C33.4923 35.427 32.4045 34.6267 31.1865 34.0786C29.9685 33.5305 28.6481 33.2471 27.3125 33.2471C25.9769 33.2471 24.6565 33.5305 23.4385 34.0786C22.2205 34.6267 21.1327 35.427 20.2469 36.4266C20.0382 36.6585 19.8773 36.9293 19.7734 37.2234C19.6694 37.5176 19.6244 37.8293 19.641 38.1408C19.6575 38.4524 19.7353 38.7576 19.8698 39.039C20.0043 39.3205 20.193 39.5727 20.425 39.7813C20.6588 39.9881 20.9311 40.1468 21.2263 40.2483C21.5215 40.3498 21.8339 40.3921 22.1454 40.3728C22.457 40.3535 22.7617 40.273 23.0421 40.1358C23.3226 39.9987 23.5732 39.8076 23.7797 39.5735C24.2251 39.0778 24.7699 38.6815 25.3785 38.4102C25.9872 38.1388 26.6461 37.9986 27.3125 37.9986C27.9789 37.9986 28.6378 38.1388 29.2465 38.4102C29.8551 38.6815 30.3999 39.0778 30.8453 39.5735ZM44.5609 50.261C42.6186 51.5578 40.3355 52.2499 38 52.2499C35.6645 52.2499 33.3814 51.5578 31.4391 50.261C31.178 50.0888 30.8856 49.9699 30.5785 49.911C30.2714 49.8522 29.9558 49.8545 29.6496 49.918C29.3434 49.9814 29.0528 50.1047 28.7944 50.2807C28.536 50.4568 28.3149 50.6821 28.1438 50.9438C27.801 51.4696 27.6774 52.1087 27.7995 52.7244C27.9215 53.3401 28.2795 53.8837 28.7969 54.2391C31.5281 56.0407 34.7281 57.001 38 57.001C41.2719 57.001 44.4719 56.0407 47.2031 54.2391C47.7205 53.8837 48.0785 53.3401 48.2005 52.7244C48.3226 52.1087 48.199 51.4696 47.8563 50.9438C47.6851 50.6821 47.464 50.4568 47.2056 50.2807C46.9472 50.1047 46.6566 49.9814 46.3504 49.918C46.0442 49.8545 45.7286 49.8522 45.4215 49.911C45.1144 49.9699 44.822 50.0888 44.5609 50.261ZM66.5 14.3391V30.875C66.5 41.5031 63.6203 51.5078 58.425 59.0781C53.2297 66.6484 45.7781 71.25 38 71.25C30.2219 71.25 22.9484 66.9453 17.575 59.0781C12.2016 51.2109 9.5 41.5031 9.5 30.875V14.3391C9.50057 13.567 9.68934 12.8066 10.05 12.1239C10.4106 11.4412 10.9322 10.8567 11.5697 10.421C12.2071 9.98534 12.9412 9.71162 13.7082 9.62356C14.4753 9.53549 15.2523 9.63575 15.9719 9.91564C20.1281 11.5485 28.5594 14.25 38 14.25C47.4406 14.25 55.8719 11.5485 60.0281 9.91564C60.7477 9.63575 61.5247 9.53549 62.2918 9.62356C63.0588 9.71162 63.7929 9.98534 64.4303 10.421C65.0678 10.8567 65.5894 11.4412 65.95 12.1239C66.3107 12.8066 66.4994 13.567 66.5 14.3391ZM61.75 14.3391C57.2672 16.0906 48.2125 19 38 19C27.7875 19 18.7328 16.0906 14.25 14.3391V30.875C14.25 40.5531 16.8328 49.6078 21.4938 56.4063C26.1547 63.2047 31.825 66.5 38 66.5C44.175 66.5 50.0234 62.9078 54.5063 56.4063C58.9891 49.9047 61.75 40.5531 61.75 30.875V14.3391Z"
        fill={color}
      />
    </svg>
  );
};

LogoIcon.defaultProps = { className: "", color: "#A78BFA" };

export default LogoIcon;
