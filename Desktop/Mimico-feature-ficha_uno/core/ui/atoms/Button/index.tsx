import { FC } from "react";
import { iconMap } from "./constants";
import { ButtonProps } from "./interface";
import { IconPreview, Title, Touchable } from "./styled";

export const Button: FC<ButtonProps> = ({
  icon,
  title,
  dense,
  type = "primary",
  color = "primary",
  variant = "filled",
  ...props
}) => {
  return (
    <Touchable dense={dense} type={type} variant={variant} {...props}>
      {icon && (
        <IconPreview
          source={
            iconMap?.[variant === "filled" ? "light" : "alternative"]?.[
              icon as never
            ]
          }
        />
      )}
      {title && (
        <Title variant={variant} color={color}>
          {title}
        </Title>
      )}
    </Touchable>
  );
};
