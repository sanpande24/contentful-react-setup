import { getEntriesByContentType } from "../../lib/helpers";
import _ from "lodash";
import Video from "../components/Video";

const WebinarPage = (props) => {
    console.log("static props", props);
    const video = _.get(props, "assets.items[0]");
  const contentType = _.get(video, "sys.contentType.sys.id");
  const videoId = _.get(video, "sys.id");
  const fields = _.get(video, "fields");
  const title = _.get(video, "fields.title");

  return <Video key={sectionId} fields={fields} />;

}

export async function getStaticPaths() {
    const videoEntries = await getEntriesByContentType("trainingVideos");
  
    let paths = [];
    if (videoEntries) {
      try {
        paths = videoEntries.items.map((entry) => {
          const slugVal = _.get(entry, "fields.slug");
          return { params: { slug: slugVal } };
        });
      } catch (error) {}
    }
  
    return {
      paths: paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps(context) {
    const slug = _.get(context, "params.slug");
    const videos = await getEntriesByContentType("trainingVideos", slug);
  
    return {
      props: { videos },
    };
  }
  export default WebinarPage;