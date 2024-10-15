import './Header.css';

interface HeaderProps {
  title: string;
  icon?: React.ReactNode;
}

export const Header = ({ title, icon }: HeaderProps) => {
  return (
    <div className='header'>
      <p>{title}</p>
      {icon && <span className="icon">{icon}</span>} 
    </div>
  );
};


