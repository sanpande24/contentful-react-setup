import { createClient } from "contentful-management";
import { serialize } from "cookie";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const client = createClient({
    accessToken: process.env.CMA_TOKEN,
  });

  const space = await client.getSpace(process.env.NEXT_PUBLIC_SPACE_ID);
  const environment = await space.getEnvironment(process.env.NEXT_PUBLIC_ENVIRONMENT);

  // Check if user exists in Contentful
  const users = await environment.getEntries({
    content_type: "user",
    "fields.email": email,
  });

  if (users.items.length === 0) {
    return res.status(401).json({ error: "User not found" });
  }

  const user = users.items[0];

  let userGroupName = "Guest"; // Default to "Guest" if no group is found

  if (user.fields.group) {
    const userGroupRef = user.fields.group["en-US"];

    // Fetch the user group entry to get the actual name
    if (userGroupRef?.sys?.id) {
      try {
        const userGroupEntry = await environment.getEntry(userGroupRef.sys.id);
        userGroupName = userGroupEntry.fields.name ? userGroupEntry.fields.name["en-US"] : "Guest";
      } catch (error) {
        console.error("Error fetching user group name:", error);
      }
    }
  }

  // Set a session cookie for authentication
  res.setHeader(
    "Set-Cookie",
    serialize("userSession", JSON.stringify({ email, userGroup: userGroupName }), {
      path: "/",
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    })
  );

  return res.status(200).json({ message: "Login successful", userGroup: userGroupName });
}
