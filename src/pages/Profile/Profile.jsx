import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import styles from './Profile.module.css';
import dt from '../../service/data/Record.json';
import NavigationBar from '../../components/navbar/nav';
import PieChart from '../../components/pie/PieChart';
import { ProgressBar } from 'react-bootstrap';
import { GoogleLogout } from 'react-google-login';
import Returnbtn from '../../components/returnBtn/returnbtn';

const ProfileC = ({ logOut }) => {
  const profile = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  // Function to calculate sum by type and user
  const calculateSumByTypeAndUser = (data, type, userID) => {
    return data.reduce((total, item) => {
      if (item.type === type && item.userID === userID) {
        return total + item.amount;
      }
      return total;
    }, 0);
  };

  const userID = 123; // Replace with the actual user ID
  const totalIncome = calculateSumByTypeAndUser(dt, 'income', userID);
  const totalWant = calculateSumByTypeAndUser(dt, 'want', userID);
  const totalNeed = calculateSumByTypeAndUser(dt, 'need', userID);
  const wantAndNeedData = dt.filter(item => item.type === 'want' || item.type === 'need');

  const clientId = "831352639707-shhtm34vua2bbiibnt88j86lu8fi2bpb.apps.googleusercontent.com";

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Returnbtn url="/" />
      <div className={styles.pcontainer}>
        <div className={styles.profile}>
          <i className={`bi bi-person-circle ${styles['custom-icon']}`}></i>
          <div className={styles.Name}>Name : {profile.name}</div>
        </div>
        <div className={styles.detail}>
          <div className={styles.amoutDatail}>Income: {totalIncome} | </div>
          <div className={styles.amoutDatail}>Expense: {totalWant + totalNeed} |</div>
          <div className={styles.amoutDatail}>Net: {totalIncome - (totalWant + totalNeed)}</div>
        </div>
        <div className={styles.bar}>
          <ProgressBar style={{ fontSize: 15, height: 40 }}>
            <ProgressBar label={`Net ${((totalIncome - totalWant - totalNeed) / totalIncome * 100).toFixed(2)}%`} variant="success" now={(totalIncome - totalWant - totalNeed) / totalIncome * 100} key={1} />
            <ProgressBar label={`Want ${((totalWant / totalIncome * 100).toFixed(0))}%`} variant="warning" now={totalWant / totalIncome * 100} key={2} />
            <ProgressBar label={`Need ${((totalNeed / totalIncome * 100).toFixed(0))}%`} variant="danger" now={totalNeed / totalIncome * 100} key={3} />
          </ProgressBar>
        </div>
        <div className={styles.pie}>
          <PieChart data={wantAndNeedData} />
        </div>
        <div className={styles.logout}>
          <GoogleLogout clientId={clientId} buttonText='Log out' onLogoutSuccess={logOut} />
        </div>
      </div>
    </>
  );
};

export default ProfileC;
