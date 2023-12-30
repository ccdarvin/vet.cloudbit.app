import { IResourceComponentsProps, useParsed } from "@refinedev/core";
import { NotesList } from "../notes";



export const PatientsNotesList: React.FC<IResourceComponentsProps> = () => {

  const { params } = useParsed<{ patient: string }>();

  if (!params?.patient) return null;

  return <NotesList objectId={params?.patient} objectType="patients" />
}