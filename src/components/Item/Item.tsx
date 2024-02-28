import React from "react";
import "./Item.css";

type ItemProps = {
  text: string;
  mainText?: string;
  subtext?: string;
  children?: React.ReactNode;
};

export const Item: React.FC<ItemProps> = ({
  text,
  mainText,
  subtext,
  children,
}) => {
  return (
    <div className="item">
      <span className="text">{text}</span>
      {mainText && <span className="mainText">{mainText}</span>}
      {subtext && <span className="subtext">{subtext}</span>}
      {children}
    </div>
  );
};
