import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";
import React from "react";

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const res = await fetch(`http://localhost:3000/api/orders/${params.orderId}`);

  const { orderDetails, customer } = await res.json();

  const { street, city, state, postalCode, country } =
    orderDetails.shippingAdress;

  return (
    <section className="flex flex-col p-10 gap-4">
      <div className="flex flex-col justify-center items-center gap-4 p-8 rounded-xl bg-[#dadada]">
        <p className="text-base-bold">
          Commande ID :{" "}
          <span className="text-base-medium">{orderDetails._id}</span>
        </p>
        <p className="text-base-bold">
          Nom du client :{" "}
          <span className="text-base-medium">{customer.name}</span>
        </p>
        <p className="text-base-bold">
          Adresse de livraison :{" "}
          <span className="text-base-medium">
            {street}, {city}, {postalCode}, {country}
          </span>
        </p>
        <p className="text-base-bold">
          Total de la commande :{" "}
          <span className="text-base-medium">{orderDetails.totalAmount} €</span>
        </p>
        <p className="text-base-bold">
          Livraison :{" "}
          <span className="text-base-medium">{orderDetails.shippingRate}</span>
        </p>
      </div>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </section>
  );
}
