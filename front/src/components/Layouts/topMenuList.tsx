import { ROLES } from "../../constants";
import Icons from "../../icons/sidebar";

const index = (role: string) => {
  const common = [
  
     {
      title: "Favoris",
      Icon: Icons.TrainingIcon,
      path: "/favoris",
    },
 
  ]

  return common
}

export default index;
