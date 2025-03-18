import _ from "lodash";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TwoColumn from "../components/TwoColumn";
import ProductSection from "../components/ProductSection";
import SolutionTool from "../components/SolutionTool";
import HeroBanner from "../components/HeroBanner";
import ThreeCard from "../components/ThreeCard";
import { getEntriesByContentType } from "../lib/helpers";
 
export default function Home(props) {
  const page = _.get(props, "page");
  const sections = _.get(page, "fields.sections");
    const header = _.get(page, "fields.header.fields");
 
  const footer = _.get(props, "page.fields.footer");
  console.log("page", page);
 
  return (
    <>
      <Header header={header} />
      <div className="flex flex-col space-y-4">
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {
              const contentType = _.get(section, "sys.contentType.sys.id");
            debugger;
              const sectionId = _.get(section, "sys.id");
              console.log("contentType", contentType);
              const fields = _.get(section, "fields");
              if (contentType === "twoColumn") {
                return (
                  <TwoColumn
                    key={sectionId}
                    id={sectionId}
                    fields={fields}
                  />
                );
              }
       else if (contentType === "heroBanner") {
                return (
                  <HeroBanner key={sectionId} id={sectionId} fields={fields} />
                );
              }
              return null; // Render nothing for unsupported content types
            })
          : ""}
      </div>
   {
    <Footer footer={footer} />
}
    </>
  );
}
 
export async function getStaticProps() {
  const pageEntries = await getEntriesByContentType("lamLandingPage", "home-page");
  debugger;
  const homepageEntry = _.get(pageEntries, "items[0]");
 
  return {
    props: {
      page: homepageEntry || {}, // Provide an empty object as fallback
    },
  };
}