import { useStore } from "@nanostores/react";
import { $feed, $profile } from "@/stores/bluesky";

const Previously = ({ feed }) => {
  return (
    <details>
      <summary>Previously...</summary>

      <ul>
        {feed.map(({ post }) => (
          <li key={post.cid}>
            <strong>...</strong> <span>{(post.record as any).text}</span>
          </li>
        ))}
      </ul>
    </details>
  );
};

const Now = () => {
  const profile = useStore($profile);
  const feed = useStore($feed);

  if (profile.state !== "ready" || feed.state !== "ready") return null;
  if (profile.value === null || feed.value.length === 0) return null;

  const {
    value: { handle },
  } = profile;
  const [
    {
      post: { record },
    },
    ...older
  ] = feed.value;

  return (
    <div>
      <strong>{handle}</strong> <span>{(record as any).text}</span>
      <Previously feed={older} />
    </div>
  );
};

export default Now;
