import React from 'react'
import { format } from 'date-fns';
import './card.css'

function DebtCard({prop}) {
  const DebtImg ="https://cdn-icons-png.flaticon.com/512/3696/3696177.png";
  return (
    <>
    <div className="savecard">
            <img className="img-debt" src={DebtImg}/>
            <div className="Name">Name : <span>{prop.name}</span></div>
            <div className="Total">Total : {prop.total}</div>
            <div className="Deadline">Deadline: {format(new Date(prop.deadline), 'dd/MM/yyyy')}</div>
            <div className="Arrear">Arrear : {prop.arrear}</div>
            <i class="bi bi-arrows-angle-expand"></i>
    </div>
    </>
  )
}

export default DebtCard