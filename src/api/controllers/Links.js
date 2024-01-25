import ytdl from 'ytdl-core';

async function fetchMP3(req, res) {
  const videoUrl = req.query.link;

  if (!videoUrl) {
    return res.status(400).json({ message: "No YoutubeLink provided" });
  }

  try {
    const info = await ytdl.getInfo(videoUrl);

    const title = info.videoDetails.title;
    console.log(title);

    const filename = title.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "_") + ".mp3";

    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'audio/mpeg');

    ytdl(videoUrl, {
      format: 'mp3',
      filter: 'audioonly',
    }).pipe(res);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export default fetchMP3;
