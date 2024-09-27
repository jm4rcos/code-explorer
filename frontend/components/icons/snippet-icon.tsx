interface Props {
  color?: string;
}

export const SnippetIcon = ({ color = 'currentColor' }: Props) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M8.50199 5.38699C8.64985 5.25385 8.73876 5.06743 8.74917 4.86874C8.75958 4.67004 8.69063 4.47535 8.55749 4.32749C8.42435 4.17963 8.23793 4.09072 8.03924 4.08031C7.84054 4.0699 7.64585 4.13885 7.49799 4.27199L5.76099 5.83599C5.02399 6.49899 4.41399 7.04799 3.99399 7.54599C3.55399 8.07099 3.23999 8.63399 3.23999 9.32999C3.23999 10.025 3.55299 10.588 3.99399 11.112C4.41399 11.611 5.02399 12.161 5.76099 12.823L7.49799 14.387C7.5712 14.4529 7.65668 14.5038 7.74955 14.5367C7.84242 14.5696 7.94085 14.5838 8.03924 14.5787C8.13762 14.5735 8.23402 14.549 8.32295 14.5066C8.41187 14.4642 8.49157 14.4047 8.55749 14.3315C8.62341 14.2583 8.67427 14.1728 8.70716 14.0799C8.74005 13.9871 8.75432 13.8886 8.74917 13.7902C8.74402 13.6919 8.71954 13.5955 8.67712 13.5065C8.63471 13.4176 8.5752 13.3379 8.50199 13.272L6.80499 11.745C6.01699 11.036 5.48599 10.555 5.14199 10.147C4.81199 9.75399 4.73999 9.52499 4.73999 9.32999C4.73999 9.13399 4.81199 8.90499 5.14199 8.51199C5.48599 8.10299 6.01699 7.62299 6.80499 6.91399L8.50199 5.38699ZM14.18 4.27499C14.2752 4.30031 14.3645 4.34414 14.4428 4.40398C14.5211 4.46383 14.5868 4.53851 14.6362 4.62376C14.6856 4.70901 14.7177 4.80316 14.7307 4.90084C14.7437 4.99851 14.7374 5.09778 14.712 5.19299L10.725 20.193C10.6996 20.2882 10.6558 20.3775 10.5959 20.4557C10.5361 20.534 10.4614 20.5997 10.3762 20.6491C10.2909 20.6985 10.1968 20.7306 10.0991 20.7437C10.0015 20.7567 9.9022 20.7503 9.80699 20.725C9.71178 20.6996 9.6225 20.6558 9.54424 20.5959C9.46597 20.5361 9.40027 20.4614 9.35087 20.3762C9.30147 20.2909 9.26934 20.1968 9.25632 20.0991C9.2433 20.0015 9.24964 19.9022 9.27499 19.807L13.262 4.80699C13.2873 4.71177 13.3311 4.62246 13.391 4.54418C13.4508 4.4659 13.5255 4.40018 13.6108 4.35078C13.696 4.30137 13.7902 4.26925 13.8878 4.25625C13.9855 4.24324 14.0848 4.24961 14.18 4.27499ZM15.443 10.498C15.5762 10.3503 15.7625 10.2615 15.9611 10.2512C16.1597 10.2409 16.3542 10.3099 16.502 10.443L18.239 12.006C18.976 12.669 19.586 13.219 20.006 13.717C20.446 14.241 20.76 14.805 20.76 15.5C20.76 16.195 20.447 16.759 20.006 17.283C19.586 17.781 18.976 18.331 18.239 18.993L16.502 20.558C16.4287 20.6239 16.3432 20.6748 16.2502 20.7076C16.1573 20.7405 16.0588 20.7547 15.9604 20.7495C15.862 20.7443 15.7655 20.7198 15.6766 20.6773C15.5876 20.6348 15.5079 20.5753 15.442 20.502C15.3761 20.4287 15.3252 20.3432 15.2924 20.2502C15.2595 20.1573 15.2453 20.0588 15.2505 19.9604C15.2557 19.862 15.2802 19.7655 15.3227 19.6766C15.3651 19.5876 15.4247 19.5079 15.498 19.442L17.195 17.916C17.983 17.206 18.514 16.726 18.858 16.317C19.188 15.925 19.26 15.695 19.26 15.5C19.26 15.305 19.188 15.075 18.858 14.683C18.514 14.273 17.983 13.793 17.195 13.084L15.498 11.557C15.3503 11.4238 15.2615 11.2375 15.2512 11.0389C15.2409 10.8403 15.3099 10.6457 15.443 10.498Z"
        fill={color}
      />
    </svg>
  );
};
