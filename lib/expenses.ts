import db from "./db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createExpense(expense: any) {
  console.log("expense in db", expense);
  const result = db
    .prepare(
      `INSERT INTO expenses (name, amount, category, status, date, user_id) VALUES (?, ?, ?, ?, ?, ?)`
    )
    .run(
      expense.name,
      expense.amount,
      expense.category,
      expense.status,
      expense.date,
      expense["user_id"]
    );
  return result.lastInsertRowid;
}

export async function getAllExpenses() {
  const result = db.prepare(`SELECT * FROM expenses`).all();
  return result;
}
export async function getAllBills() {
  const result = db.prepare(`SELECT * FROM bills`).all();
  return result;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createBill(bill: any) {
  const result = db
    .prepare(
      `INSERT INTO bills (name, amount, category, status, date, url, user_id, expense_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      bill.name,
      bill.amount,
      bill.category,
      bill.status,
      bill.date,
      bill.url,
      bill.user_id,
      bill.expense_id
    );
  return result.lastInsertRowid;
}

export async function getBillsByExpenseId(expenseId: number) {
  const result = db
    .prepare(`SELECT * FROM bills WHERE expense_id = ?`)
    .all(expenseId);
  return result;
}
export async function getExpensesByUserId(userId: string) {
  console.log("userId in db", userId);
  const result = db
    .prepare(`SELECT * FROM expenses WHERE user_id = ?`)
    .all(userId);
  return result;
}
export async function getBillsByUserId(userId: string) {
  const result = db
    .prepare(`SELECT * FROM bills WHERE user_id = ?`)
    .all(userId);
  return result;
}
export async function getExpenseById(expenseId: string) {
  const result = db
    .prepare(`SELECT * FROM expenses WHERE id = ?`)
    .get(expenseId);
  return result;
}
export async function getBillById(billId: number) {
  const result = db.prepare(`SELECT * FROM bills WHERE id = ?`).get(billId);
  return result;
}
export async function deleteExpenseById(expenseId: string) {
  const result = db.prepare(`DELETE FROM expenses WHERE id = ?`).run(expenseId);
  return result;
}
export async function deleteBillById(billId: string) {
  const result = db.prepare(`DELETE FROM bills WHERE id = ?`).run(billId);
  return result;
}
export async function updateExpenseById(
  expenseId: string,
  expense: {
    name?: string;
    amount?: string;
    category?: string;
    status?: string;
  }
) {
  const result = db
    .prepare(
      `UPDATE expenses SET name = ?, amount = ?, category = ?, status = ? WHERE id = ?`
    )
    .run({ ...expense, expenseId });
  return result;
}
export async function updateBillById(
  billId: number,
  bill: {
    name?: string;
    amount?: string;
    category?: string;
    status?: string;
    url?: string;
  }
) {
  const result = db
    .prepare(
      `UPDATE bills SET name = ?, amount = ?, category = ?, status = ?, url = ? WHERE id = ?`
    )
    .run(bill.name, bill.amount, bill.category, bill.status, bill.url, billId);
  return result;
}
export async function updateBillUrlById(billId: string, url: string) {
  const result = db
    .prepare(`UPDATE bills SET url = ? WHERE id = ?`)
    .run(url, billId);
  return result;
}
export async function updateExpenseStatusById(
  expenseId: string,
  status: string
) {
  const result = db
    .prepare(`UPDATE expenses SET status = ? WHERE id = ?`)
    .run(status, expenseId);
  return result;
}
export async function updateBillStatusById(billId: string, status: string) {
  const result = db
    .prepare(`UPDATE bills SET status = ? WHERE id = ?`)
    .run(status, billId);
  return result;
}
