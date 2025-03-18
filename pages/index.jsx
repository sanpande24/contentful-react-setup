import { useEffect, useState } from "react";
import _ from "lodash";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TwoColumn from "../components/TwoColumn";
import ProductSection from "../components/ProductSection";
import SolutionTool from "../components/SolutionTool";
import HeroBanner from "../components/HeroBanner";
import ThreeCard from "../components/ThreeCard";
import ColumnCard from "../components/ColumnCardComponent";
import ColumnCardCollection from "../components/ColumnCardCollectionComponent";
import ThreeColumnComponent from "../components/ThreeColumnComponent";
import { getEntriesByContentType } from "../lib/helpers";
import { parseCookies } from "nookies";
import Video from "../components/Video";


export default function Home(props) {
  const page = _.get(props, "page");
  const sections = _.get(page, "fields.sections");
  const header = _.get(page, "fields.header.fields");
  const footer = _.get(props, "page.fields.footer");

  // 🔹 State to store userGroup (initially `null` to avoid hydration mismatch)
  const [userGroup, setUserGroup] = useState(null);

  useEffect(() => {
    // Fetch userGroup from cookies only on the client side
    const cookies = parseCookies();
    try {
      const userSession = cookies.userSession ? JSON.parse(cookies.userSession) : null;
      if (userSession && userSession.userGroup) {
        setUserGroup(userSession.userGroup);
      } else {
        setUserGroup("Guest"); // Default role
      }
    } catch (error) {
      console.error("Error parsing userSession cookie:", error);
      setUserGroup("Guest"); // Fallback
    }
  }, []); // Runs only on mount (client-side)

  // 🔹 Avoid rendering until userGroup is determined (Fixes Hydration Issue)
  if (userGroup === null) return null;

  return (
    <>
      <Header header={header} />

      <div className="flex flex-col space-y-4">    
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {
              const contentType = _.get(section, "sys.contentType.sys.id");
              const sectionId = _.get(section, "sys.id");
              const fields = _.get(section, "fields");
              //console.log("contentType", contentType);
              //console.log("fields", fields);
              if (contentType === "twoColumn") {
                return <TwoColumn key={sectionId} id={sectionId} fields={fields} />;
              } 
              if (contentType === "solutionTool") {
                return <SolutionTool key={sectionId} id={sectionId} fields={fields} />;
              } else if (contentType === "productSection") {
                return <ProductSection key={sectionId} id={sectionId} fields={fields} />;
              } else if (contentType === "heroBanner") {
                return <HeroBanner key={sectionId} id={sectionId} fields={fields} />;
              } else if (contentType === "threeCard") {
                return <ThreeCard key={sectionId} id={sectionId} fields={fields} />;
              } else if (contentType === "columncard") {
                return <ColumnCard key={sectionId} id={sectionId} fields={fields} userGroup={userGroup} />;
              } else if (contentType === "columnCardCollection") {
                return <ColumnCardCollection key={sectionId} fields={fields} userGroup={userGroup} />;
              } else if (contentType === "threeColumn") {
                return <ThreeColumnComponent key={sectionId} fields={fields} />;
              }
              else if (contentType === "trainingVideos") {
                return <Video key={sectionId} fields={fields} />;
              }
              else if (contentType === "product") {
                return (
                  <div key={sectionId}>
                    {contentType} - {fields.title}
                  </div>
                );
              }
              return null; // Render nothing for unsupported content types
            })
          : ""}
      </div>

      <Footer footer={footer} />
    </>
  );
}

export async function getStaticProps() {
  const pageEntries = await getEntriesByContentType("lamLandingPage", "home-page");
  const homepageEntry = _.get(pageEntries, "items[0]");


  return {
    props: {
      page: homepageEntry || {}, // Provide an empty object as fallback
    },
  };
}
