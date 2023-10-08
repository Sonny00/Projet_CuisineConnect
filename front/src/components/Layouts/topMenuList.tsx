import { ROLES } from "../../constants";
import Icons from "../../icons/sidebar";

const index = (role: string) => {
  const common = [
  
     {
      title: "Favoris",
      Icon: Icons.TrainingIcon,
      path: "/dashboard/favoris",
    },
 
  ]

  return common
}

export default index;
