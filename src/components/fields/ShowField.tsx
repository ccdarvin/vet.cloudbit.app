import { useLink, useNavigation } from "@refinedev/core";



export default function ShowField({
  resource,
  recordItemId,
  children,
}: {
  resource: string;
  recordItemId: string;
  children: React.ReactNode;
}){

  const { showUrl } = useNavigation()

  const url = showUrl(resource, recordItemId)
  const Link = useLink()
  return (
    <Link to={url}>
      {children}
    </Link>
  );
}