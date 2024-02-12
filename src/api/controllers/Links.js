import ytdl from "ytdl-core";
import { Link } from "../../models/index.js";

async function fetchVideoInfo(videoUrl) {
  try {
    console.log("Fetching video info for:", videoUrl);

    const info = await ytdl.getInfo(videoUrl);
    const title = info.videoDetails.title;
    const filename =
      title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") + ".mp3";

    return {
      title: title,
      filename: filename,
    };
  } catch (error) {
    console.error("Error fetching video info:", error);
    throw error;
  }
}

async function updateLinkCounter(videoUrl) {
  try {
    console.log("Updating link counter for:", videoUrl);

    let link = await Link.findOne({ url: videoUrl });

    if (link) {
      link.counter += 1;
      await link.save();

      console.log("Link counter updated successfully:", link);
    } else {
      const newLink = new Link({ url: videoUrl, counter: 1 });
      await newLink.save();

      console.log("New link created with counter:", newLink);
    }

    const updatedLink = await Link.findOne({ url: videoUrl });
    console.log("Link after update:", updatedLink);

    return updatedLink;
  } catch (error) {
    console.error("Error updating link counter:", error);
    throw error;
  }
}

async function fetchMP3(req, res) {
  const videoUrl = req.query.link;

  if (!videoUrl) {
    return res.status(400).json({ message: "No YoutubeLink provided" });
  }

  try {
    console.log("Starting MP3 download for:", videoUrl);

    const videoInfo = await fetchVideoInfo(videoUrl);
    console.log("Video info fetched:", videoInfo);

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${videoInfo.filename}"`,
    );
    res.setHeader("Content-Type", "audio/mpeg");

    ytdl(videoUrl, {
      format: "mp3",
      filter: "audioonly",
    }).pipe(res);

    const updatedLink = await updateLinkCounter(videoUrl);
    console.log("MP3 download completed. Updated link:", updatedLink);

    res.json({ filename: videoInfo.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export default fetchMP3;
