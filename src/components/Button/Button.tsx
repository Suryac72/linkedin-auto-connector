import React from "react";
import './Button.css';
interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
}
export const Button = ({ title, ...rest }: ButtonProps) => {
  return <button {...rest}>{title}</button>;
};


