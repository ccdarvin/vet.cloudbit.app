import Icon from '@ant-design/icons';
import { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon';
import { PiDog } from "react-icons/pi";



export const PatientIcon = (props: Partial<CustomIconComponentProps>) => {
  return (
    <Icon component={PiDog} {...props} />
  )
}