import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';

interface HeaderProps {
  onOpenTransactionModal: () => void
}

export function Header({ onOpenTransactionModal }: HeaderProps) {
  return (
    <Container>
      <Content>
      <img src={logo} alt="dt money"/>
      <button type="button" onClick={onOpenTransactionModal}>
        Nova transação
      </button>
      </Content>
    </Container>
  )
}