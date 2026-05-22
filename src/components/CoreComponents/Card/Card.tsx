import type { PropsWithChildren } from "react";
import "./Card.css";

type CardProps = PropsWithChildren & {
  className?: string;
};

const Card = ({ className, children }: CardProps) => {
  return <div className={`${className} card-container`}>{children}</div>;
};

export default Card;
