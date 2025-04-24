import { getBillsByExpenseIdAction } from "@/lib/actions";
import DataGrid, { Column } from "@/components/data-grid/page";
import DetailsView from "@/components/detail-view/page";
import PageHeader from "@/components/page-header/page-header";

const mockDetails = [
  { label: "Title", value: "Business Lunch" },
  { label: "Amount", value: "$120" },
  { label: "Category", value: "Food" },
  { label: "Date", value: "2025-04-19" },
];
type Params = Promise<{ expenseid: string }>;
type PageProps = {
  params: Params;
};
export default async function ExpenseDetails({ params }: PageProps) {
  const { expenseid } = await params;

  const billColumns: Array<Column> = [
    {
      id: "name",
      name: "Name",
      renderAs: "Hyperlink",
      href: `/expenses/${expenseid}/bills`,
    },
    {
      id: "amount",
      name: "Amount",
      renderAs: "Text",
    },
    {
      id: "category",
      name: "Category",
      renderAs: "Text",
    },
    {
      id: "status",
      name: "Status",
      renderAs: "Chip",
    },
    {
      id: "date",
      name: "Date",
      renderAs: "Text",
    },

    // Add more mock data
  ];

  const bills = await getBillsByExpenseIdAction(Number(expenseid));

  return (
    <main>
      <PageHeader title="Expense Details" />
      <section id="expense-details">
        <DetailsView details={mockDetails} />
      </section>
      <PageHeader
        title="Bills"
        actions={[
          {
            label: "Upload Bill",
            href: `/expenses/${expenseid}/upload-bill`,
          },
        ]}
      />
      <section id="bills-list">
        <DataGrid columns={billColumns} data={bills} />
      </section>
    </main>
  );
}
