export const getBaseUrl = () => {
    return (
      process.env.REACT_APP_BASE_URL ||
      "https://home-hospital.vercel.app/api/v1"
    );
}

export const getImageBBKey=()=>{
    return process.env.NEXT_PUBLIC_IMAGE_BB_API_KEY;
}

export const getDefaultDP=()=>{
    return process.env.NEXT_PUBLIC_DEFAULT_DP;
}