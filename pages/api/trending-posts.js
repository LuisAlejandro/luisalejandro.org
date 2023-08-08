import axios from "axios";

export default async function hotPosts(req, res) {
  // const url = new URL("https://disqus.com/api/3.0/threads/listHot.json");
  // const params = {
  //   forum: process.env.NEXT_PUBLIC_DISQUS_SHORTNAME,
  //   api_key: process.env.DISQUS_API_KEY,
  //   limit: 10,
  // };

  // const { data } = await axios.get(
  //   `${url.origin}${url.pathname}?${new URLSearchParams([
  //     ...Object.entries(params),
  //   ])}`
  // );
  const data = [];
  return res.status(200).json(data);
}
