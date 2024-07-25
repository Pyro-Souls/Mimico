import { Typography } from "../core/ui/atoms";
import { ContainerUI } from "../core/ui/organisms";

const WelcomeView = () => {
  return (
    <ContainerUI mode="menu" module="Settings">
      <Typography text="¡Bienvenid@!" size="h2" fontWeight="bold" />
    </ContainerUI>
  );
};

export default WelcomeView;
