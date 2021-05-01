import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { Container, TypeContainer, RadioBox } from './styles';
import closeImg from '../../assets/close.svg';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { useTransactions } from '../../hooks/useTransactions';

Modal.setAppElement('#root');

interface TransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const TRANSACTION_TYPE = {
  DEPOSIT: 'deposit',
  WITHDRAW: 'withdraw',
}

export function TransactionModal({ isOpen, onRequestClose }: TransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [type, setType] = useState(TRANSACTION_TYPE.DEPOSIT);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState('');

  async function handleCreateTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({
      title,
      amount,
      type,
      category
    });

    setTitle('');
    setAmount(0);
    setCategory('0');
    setType(TRANSACTION_TYPE.DEPOSIT);

    onRequestClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      onRequestClose={onRequestClose}>
      <button
        type="button"
        onClick={onRequestClose}
        className="react-modal-close">
        <img src={closeImg} alt="Fechar modal"/>
      </button>
      <Container onSubmit={handleCreateTransaction}>
        <h2>Cadastrar transação</h2>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        <TypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType(TRANSACTION_TYPE.DEPOSIT)}
            active={type === TRANSACTION_TYPE.DEPOSIT}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada"/>
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType(TRANSACTION_TYPE.WITHDRAW)}
            active={type === TRANSACTION_TYPE.WITHDRAW}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída"/>
            <span>Saída</span>
          </RadioBox>
        </TypeContainer>
        <input
          type="text"
          placeholder="Categoria"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <button type="submit">Cadastrar</button>
      </Container>
    </Modal>
  );
};

