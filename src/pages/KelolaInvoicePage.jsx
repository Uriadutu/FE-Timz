import React, { useEffect } from 'react'
import Layout from './Layout'
import KelolaInvoice from '../component/KelolaInvoice'
import { getMe } from '../features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const KelolaInvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <KelolaInvoice/>
    </Layout>
  )
}

export default KelolaInvoicePage
