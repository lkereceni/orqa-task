import type { ReactNode } from "react";
import "./Card.css";

interface CardProps {
  className?: string;
  children: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return <div className={`${className} card-container`}>{children}</div>;
};

export default Card;
