import { Button, Typography } from "../core/ui/atoms";
import { ContainerUI } from "../core/ui/organisms";
import {router} from 'expo-router';

const WelcomeView = () => {
  return (
    <ContainerUI mode="menu" module="Settings">
      <Typography text="¡Bienvenid@!" size="h2" fontWeight="bold" />
      <Button title="Iniciar sesión" onPress={() => {if (router.canDismiss()) router.dismissAll();
        router.push('login');}}/>
    </ContainerUI>
  );
};

export default WelcomeView;
