import { CiHeart, CiUser } from "react-icons/ci";
import { GoArrowDownRight } from "react-icons/go";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoIosClose } from "react-icons/io";

interface Props {
  size?: number;
  color?: string;
  className?: string
}

export const UserIcon = ({ size = 40, color, ...props }: Props) => (
  <CiUser {...props} size={size} color={color} />
);

export const GoArrowDown = ({ size = 40, color, ...props }: Props) => (
  <GoArrowDownRight {...props} size={size} color={color} />
);


export const LeftArrow = ({ size = 40, color, ...props }: Props) => (
  <MdKeyboardArrowLeft {...props} size={size} color={color} />
);

export const RightArrow = ({ size = 40, color, ...props }: Props) => (
  <MdKeyboardArrowRight {...props} size={size} color={color} />
);

export const Close = ({ size = 40, color, ...props }: Props) => (
  <IoIosClose {...props} size={size} color={color} />
);


export const Hearth = ({ size = 40, color, ...props }: Props) => (
  <CiHeart {...props} size={size} color={color} />
);