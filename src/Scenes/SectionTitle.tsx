type Props = {
    children: string
}

const Header = ({ children }: Props) => {
  return <div className="font-bold border-b-[1px] pb-3">{children}</div>
}

export default Header