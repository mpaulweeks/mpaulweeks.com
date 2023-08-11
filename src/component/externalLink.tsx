import { ExternalLinkInfo } from "@/data/external";

export function ExternalLink(props: {
  info: ExternalLinkInfo;
}) {
  return (
    <div>
      <a href={props.info.url}>
        {props.info.label}
      </a>
    </div>
  );
}
