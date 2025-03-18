export default function handler(req, res) {
    // Validate the secret to ensure the request is legitimate
    if (req.query.secret !== "preview") {
      return res.status(401).json({ message: "Invalid secret token" });
    }
  
    // Get the slug from the request
    const { slug } = req.query;
  
    if (!slug) {
      return res.status(400).json({ message: "Missing slug" });
    }
  
    // Enable Next.js preview mode
    res.setPreviewData({});
  
    // Redirect to the given slug
    res.writeHead(307, { Location: `/` });
    res.end();
  }
  