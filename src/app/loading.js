import NextTopLoader from "nextjs-toploader";

function loading() {
  return (
    <NextTopLoader
      height={2}
      color="#68af68"
      easing="cubic-bezier(0.53,0.21,0,0.67)"
    />
  );
}

export default loading;
