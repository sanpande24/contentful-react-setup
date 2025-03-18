import _ from "lodash";
import NewSearchPage from "../components/NewSearchPage";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TwoColumn from "../components/TwoColumn";
import ProductSection from "../components/ProductSection";
import SolutionTool from "../components/SolutionTool";
import HeroBanner from "../components/HeroBanner";
import ThreeCard from "../components/ThreeCard";
import { getEntriesByContentType } from "../lib/helpers";

export async function getStaticProps() {
    const pageEntries = await getEntriesByContentType("searchModel", "search-page");
    debugger;
    console.log(pageEntries);
    const homepageEntry = _.get(pageEntries, "items[0]");
   
    return {
      props: {
        page: homepageEntry || {}, // Provide an empty object as fallback
      },
    };
  }

 
export default function Home(props) {
  const page = _.get(props, "page");
  //debugger;
  const sections =_.get(page,"fields.sections");
  const header = _.get(page, "fields.header.fields");
 
  const footer = _.get(props, "page.fields.footer");
  
  //console.log("section", sections);
 
  return (
    <>
      <Header header={header} />
      <div className="flex flex-col space-y-4">
        {Array.isArray(sections)
          ? sections.map((section, sectionIndex) => {
              const contentType = _.get(section, "sys.contentType.sys.id");
            //debugger;
              const sectionId = _.get(section, "sys.id");
              //console.log("contentType", contentType);
              const fields = _.get(section, "fields");
              //console.log("fields",fields);
              if (contentType === "trainingHub") {
                return (
                  <NewSearchPage
                    key={sectionId}
                    id={sectionId}
                    fields={fields}
                  />
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
 
