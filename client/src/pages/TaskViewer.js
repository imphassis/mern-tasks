import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderExpense from '../components/HeaderExpense';
import Table from '../components/TableHeader';
import { fetchAPI } from '../services/API';

export default function Wallet() {
  const dispatch = useDispatch();
  const userStore = useSelector((state) => state.user);
  const thumbnail = 'https://remotar.com.br/wp-content/uploads/2020/10/Trybe-200x200.jpg';

  const walletStore = useSelector((state) => state.wallet);
  const { total } = walletStore;

  useEffect(() => {
    dispatch(fetchAPI());
  }, [dispatch]);

  const getTotal = () => {
    if (total > 0) {
      return total;
    }
    return 0;
  };
  return (
    <div className="wallet">
      <nav>
        <Link to="/">
          <img src={ thumbnail } alt="" />
        </Link>
        <div className="navInfo">
          <span className="m-2" data-testid="email-field">
            <i className="fas fa-user m-2" />
            {userStore.email}
          </span>
          <div className="m-2">
            <div data-testid="total-field">{getTotal()}</div>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </nav>
      <HeaderExpense />
      <Table />

    </div>
  );
}
