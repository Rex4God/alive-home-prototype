interface CardProps {
  icon?: React.ReactNode;
  title: string;
  content: string;
  cardStyle?: string;
}
export default function Card({
  icon,
  title,
  content,
  cardStyle,
  ...props
}: CardProps) {
  return (
    <div
      className={`${cardStyle} flex flex-col py-6 space-y-4 rounded-sm items-center bg-[#F8F8F8] shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]`}
      {...props}
    >
      <div className="text-[#C77D01]">{icon}</div>
      <p className="font-semibold text-lg text-[#202020]">{title}</p>
      <p className="text-[#2A2A2A] text-base font-normal">{content}</p>
    </div>
  );
}
