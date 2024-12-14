import Tooltip from "./Tooltip";

interface Props {
  icon: React.ReactNode;
  text: string;
  content: string;
}

const SmallCard = ({ icon, text, content }: Props) => {
  return (
    <Tooltip content={content}>
      <div className='h-[90px] transition duration-300 w-[100px] rounded-xl flex items-center justify-center flex-col font-medium cursor-pointer text-[11px] gap-2 bg-secondary hover:bg-light active:border-dotted active:border-2 active:border-border relative'>
        {icon}
        <h4>{text}</h4>
      </div>
    </Tooltip>
  );
};

export default SmallCard;
