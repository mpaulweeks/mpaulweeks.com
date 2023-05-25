import { ProjectInfo } from "@/data/projects"

export function ProjectLink(props: {
  info: ProjectInfo;
}) {
  const { info } = props;
  const imgSrc = info.image ?? 'preview/placeholder.png';
  return (
    <div>
      <a href={info.url}>
        <img src={imgSrc} />
        <div>
          {info.name}
        </div>
      </a>
      <div>
        {info.description.split('\n').map((line, li) => (
          <div key={[info.name, li].join('-')}>
            {line}
          </div>
        ))}
      </div>
      <div>
        {info.date_pretty}
      </div>
    </div>
  );
}
