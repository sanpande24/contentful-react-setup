import Head from "next/head";
import Link from "next/link";
const MainLayout = (props) => {
  return (
    <>
      <Head>
        <title>Home | Lam Research</title>
        <meta
          name="description"
          content="Find your Rodan + Fields consultant"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <div className="main-content">{props.children}</div>
      </main>
    </>
  );
};

export default MainLayout;
