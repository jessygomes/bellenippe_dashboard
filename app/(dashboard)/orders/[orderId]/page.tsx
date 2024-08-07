import { DataTable } from "@/components/custom-ui/DataTable";
import { columns } from "@/components/orderItems/OrderItemsColumns";
import UpdateStatut from "@/components/orders/UpdateStatut";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export default async function OrderDetailsPage({
  params,
}: {
  params: { orderId: string };
}) {
  const res = await fetch(`${baseUrl}/api/orders/${params.orderId}`, {
    cache: "no-store",
  });

  // const res = await fetch(
  //   `http://localhost:3000/api/orders/${params.orderId}`,
  //   {
  //     cache: "no-store",
  //   }
  // );

  const { orderDetails, customer } = await res.json();

  console.log("ORDER DETAILS", orderDetails);

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
        {/* <p className="text-base-bold">
          Statut :{" "}
          <span className="text-base-medium">{orderDetails.statut}</span>
        </p> */}

        <UpdateStatut orderDetails={orderDetails} />
      </div>
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey="product"
      />
    </section>
  );
}

export const dynamic = "force-dynamic";
