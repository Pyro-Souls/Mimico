import { FC } from "react";
import { View } from "react-native";
import { EnumTextSize } from "./enums";
import { TypographyLabel } from "./styled";
import { GlobalSheet } from "../../GlobalSheet";
import { ITypography, TSize } from "./interface";

export const Typography: FC<ITypography> = ({
  text,
  align,
  size = "sm",
  color = "text",
  fontWeight = "normal",
}) => {
  return (
    <View>
      <TypographyLabel
        align={align}
        color={color}
        fontWeight={fontWeight}
        isText={!size.includes("h")}
        size={EnumTextSize?.[size as TSize] as never}
        style={[size === "h1" && GlobalSheet.shadowText]}
      >
        {text}
      </TypographyLabel>
    </View>
  );
};
