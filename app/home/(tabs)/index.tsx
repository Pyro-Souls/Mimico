import { useContext } from "react";
import { GlobalSheet } from "../../../core/ui";
import useStore from "../../../providers/store";
import { View, ScrollView } from "react-native";
import { ThemeContext } from "../../../core/theme";
import { ContainerUI } from "../../../core/ui/organisms";
import {
  Button,
  Checkbox,
  Input,
  Radio,
  Typography,
} from "../../../core/ui/atoms";

export default function Tab() {
  const { user } = useStore();
  const { changeTheme } = useContext(ThemeContext);

  return (
    <ContainerUI>
      <ScrollView>
        <View style={GlobalSheet.ViewContent}>
          {/* TYPOGRAPHY */}
          <Typography size="h4" text="Tab [Home]" />
          <Typography
            size="sm"
            text={`Current user logged in: ${user.email}${user.username}`}
          />
          <Typography
            size="sm"
            text={`Current mimicoins: ${user.mimicoins}`}
          />

          {/* BUTTONS */}
          <Button title="Button Test" onPress={() => changeTheme("light")} />
          <Button
            title="Button Test"
            variant="outline"
            onPress={() => changeTheme("green")}
          />
          <Button
            title="Button Test"
            variant="text"
            onPress={() => changeTheme("blue")}
          />
          <Button
            title="Button Test"
            variant="dashed"
            onPress={() => changeTheme("green")}
          />
          <Button
            title="Button Test"
            onPress={() => changeTheme("blue")}
            icon="add"
          />

          {/* INPUTS */}
          <Input placeholder="Escriba algo..." label="Usuario" />
          <Input isArea placeholder="Escriba algo..." label="Comentarios" />

          <Radio
            options={[
              { label: "Peru", value: 1 },
              { label: "Colombia", value: 2 },
              { label: "Argentina", value: 3 },
            ]}
          />

          {/* CHECKBOX */}
          <Checkbox
            options={[
              { label: "Lechuga", value: 1 },
              { label: "Tomate", value: 2 },
              { label: "Queso", value: 3 },
            ]}
          />
        </View>
      </ScrollView>
    </ContainerUI>
  );
}
