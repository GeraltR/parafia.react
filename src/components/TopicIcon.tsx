import MenuBookIcon from "@mui/icons-material/MenuBook";

export function TopicIcon({ iconUrl, className }: { iconUrl: string | null; className?: string }) {
  if (iconUrl) {
    return <img src={iconUrl} alt="" className={className} />;
  }

  return <MenuBookIcon className={className} />;
}
