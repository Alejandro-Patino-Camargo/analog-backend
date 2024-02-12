import { Link } from "../../models/index.js";

async function getCounter(req, res) {
  try {
    const links = await Link.find({}, { counter: 1 });
    const counters = links.map((link) => link.counter);

    res.json({ counters });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export default getCounter;
