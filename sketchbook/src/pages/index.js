import Board from '@/components/Board';
import Menu from '@/components/Menu'
import Toolbox from '@/components/Toolbox'

export default function Home() {
  return (
    <>
      <div style={{overflowX:"hidden", boxSizing:"border-box"}}>
        <Menu />
        <Toolbox />
        <Board />
      </div>
    </>
  );
}
