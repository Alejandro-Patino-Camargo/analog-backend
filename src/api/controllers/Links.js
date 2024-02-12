import ytdl from "ytdl-core";
import { Link } from "../../models/index.js";
import { Buffer } from "buffer";

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

    const audioReadableStream = ytdl(videoUrl, {
      format: "mp3",
      filter: "audioonly",
    });

    const chunks = [];
    audioReadableStream.on("data", (chunk) => {
      chunks.push(chunk);
    });

    audioReadableStream.on("end", async () => {
      const audioBuffer = Buffer.from(
        chunks.reduce((acc, chunk) => acc.concat(Array.from(chunk)), []),
      );

      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${videoInfo.filename}"`,
      );
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Content-Length", audioBuffer.length);

      res.end(audioBuffer);

      const updatedLink = await updateLinkCounter(videoUrl);
      console.log("MP3 download completed. Updated link:", updatedLink);
    });
  } catch (error) {
    console.error("Error during MP3 download:", error);
    res.status(500).json({ message: error.message });
  }
}

export default fetchMP3;
