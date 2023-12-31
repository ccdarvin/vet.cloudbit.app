import Icon from "@ant-design/icons";
import { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import { PiDog } from "react-icons/pi";
import { TbVaccine } from "react-icons/tb";
import { BsCardText } from "react-icons/bs";
import { GiPillDrop } from "react-icons/gi";
import { BsCalendarEvent } from "react-icons/bs";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { MdOutlineSettings } from "react-icons/md";
import { BsPersonGear } from "react-icons/bs";
import { CiMedicalClipboard } from "react-icons/ci";
import { IoMedicalOutline } from "react-icons/io5";
import { GoNote } from "react-icons/go";
import { BsFilePerson } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import { GiBalloonDog } from "react-icons/gi";
import { VscGraphLine } from "react-icons/vsc";
import { FaListOl } from "react-icons/fa6";


export const PatientIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={PiDog} {...props} />;
};

export const VaccineIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={TbVaccine} {...props} />;
};

export const InfoIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={BsCardText} {...props} />;
};

export const AntiparasithicsIcon = (
  props: Partial<CustomIconComponentProps>
) => {
  return <Icon component={GiPillDrop} {...props} />;
};

export const AppointmentIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={BsCalendarEvent} {...props} />;
};

export const VisitIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={AiOutlineMedicineBox} {...props} />;
};

export const SettingsIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={MdOutlineSettings} {...props} />;
};

export const StaffIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={BsPersonGear} {...props} />;
};

export const MedicalRecordIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={CiMedicalClipboard} {...props} />;
};

export const TreatmentTypeIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={IoMedicalOutline} {...props} />;
};

export const NoteIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={GoNote} {...props} />;
};

export const CustomerIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={BsFilePerson} {...props} />;
};

export const ItemIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={IoIosCheckboxOutline} {...props} />;
}

export const SpeciesIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={GiBalloonDog} {...props} />;
}

export const SalesIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={VscGraphLine} {...props} />;
}

export const OrderIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={FaListOl} {...props} />;
}