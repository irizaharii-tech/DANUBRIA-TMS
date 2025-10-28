import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) axios.get(`/api/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  if (!order) return <div>Loading...</div>;
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{order.orderNumber}</h1>
      <p>Status: {order.status}</p>
      <p>Origin: {order.origin}</p>
      <p>Destination: {order.destination}</p>
      <h3 className="mt-4 font-semibold">Events</h3>
      <ul>
        {order.events?.map((e:any) => <li key={e.id}>{e.eventType} - {new Date(e.timestamp).toLocaleString()}</li>)}
      </ul>
    </div>
  );
}
